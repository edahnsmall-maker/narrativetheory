import type Anthropic from '@anthropic-ai/sdk'

/**
 * The model's write access to the person's record. Every tool here is a pure
 * state mutation with no side effects beyond the client's own store — there is
 * no server-side persistence in demo mode.
 *
 * Descriptions carry real instruction, not just typing. The model reads these
 * far more carefully than it reads a passing line in the system prompt, so the
 * rules about when *not* to call something live here.
 */

type Tool = Anthropic.Tool

const str = (description: string) => ({ type: 'string' as const, description })

export const ALL_TOOLS: Tool[] = [
  {
    name: 'record_observation',
    description:
      "Record something you've learned about this person that's worth keeping. Use their language, not clinical language. Call this as things become clear rather than saving them up. Do not record everything said — only what a careful listener would still be holding an hour later.",
    input_schema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['ailment', 'relationship', 'outlook', 'history', 'strength', 'contradiction'],
          description:
            "'outlook' is what they expect from the world and is usually implied rather than stated. 'contradiction' is where their account argues with itself. 'history' is held loosely and never treated as a cause.",
        },
        text: str('One sentence, close to how they would put it themselves.'),
        basis: str(
          'Optional. What they said that led you here — required whenever this is your inference rather than their statement, so they can argue with it.',
        ),
      },
      required: ['category', 'text'],
    },
  },

  {
    name: 'propose_node',
    description:
      "Add a node to the dream map. Always starts as 'proposed' — you do not get to confirm your own hypothesis. Build two or three at a time and discuss them; never dump a finished map on someone.",
    input_schema: {
      type: 'object',
      properties: {
        id: str(
          'Short stable slug, lowercase with dashes, e.g. "on-probation". You reference this in edges.',
        ),
        kind: {
          type: 'string',
          enum: ['origin', 'trigger', 'world', 'lens', 'consequence'],
          description:
            "'origin' is the weakest claim available and is often best left empty — phrase any origin as a condition, never as a cause. 'world' is the dream stated as if simply true. 'lens' is a specific reading, not a mood.",
        },
        label: str('Three to six words. This is the text drawn inside the box.'),
        detail: str('The fuller claim, one or two sentences. Shown when they expand the node.'),
      },
      required: ['id', 'kind', 'label'],
    },
  },

  {
    name: 'propose_edge',
    description:
      'Connect two nodes. The verb in the label carries as much of the meaning as the nodes do — prefer "gets read as" or "hardens into" over an unlabelled arrow. Loops are allowed and usually truthful: a consequence that feeds back into a trigger is a real thing.',
    input_schema: {
      type: 'object',
      properties: {
        from: str('Source node id.'),
        to: str('Target node id.'),
        label: str('The verb of the relationship, two to four words.'),
      },
      required: ['from', 'to'],
    },
  },

  {
    name: 'update_node',
    description:
      "Revise a node, or change its confidence. Move to 'confirmed' only when they have actively endorsed it — silence is not endorsement. Move to 'rejected' the moment they push back convincingly, without restating the idea in new words.",
    input_schema: {
      type: 'object',
      properties: {
        id: str('The node id to update.'),
        label: str('New label, if changing.'),
        detail: str('New detail, if changing.'),
        confidence: {
          type: 'string',
          enum: ['proposed', 'confirmed', 'rejected'],
          description: 'Their endorsement level, not your certainty.',
        },
      },
      required: ['id'],
    },
  },

  {
    name: 'remove_node',
    description:
      'Delete a node and its edges outright. Use when something was simply wrong, rather than leaving clutter on the map. Prefer this over quietly rewording a rejected idea.',
    input_schema: {
      type: 'object',
      properties: { id: str('The node id to remove.') },
      required: ['id'],
    },
  },

  {
    name: 'remove_edge',
    description: 'Delete a connection between two nodes that turned out not to hold.',
    input_schema: {
      type: 'object',
      properties: { from: str('Source node id.'), to: str('Target node id.') },
      required: ['from', 'to'],
    },
  },

  {
    name: 'set_map_frame',
    description:
      "Set the map's title and thesis. The thesis is the dream in one sentence, in their register — it is the thing they will actually remember, so do not write it early and do not write it in theory-language.",
    input_schema: {
      type: 'object',
      properties: {
        title: str('A few words naming this dream, e.g. "The probation".'),
        thesis: str('One sentence. Plain, specific, and theirs.'),
      },
      required: [],
    },
  },

  {
    name: 'add_plan_issue',
    description:
      'Add a concrete recurring situation to the plan. Must be a situation, not a theme — "goes quiet after being interrupted in meetings", not "self-doubt at work". Every response option needs its honest caveat; options without caveats are advertising.',
    input_schema: {
      type: 'object',
      properties: {
        id: str('Short stable slug.'),
        title: str('The situation, concretely.'),
        showsUpWhen: str('The specific conditions that produce it.'),
        responsibility: str(
          "What is actually theirs here. Never implies the dream is their fault or excuses how others behaved — only names what's in their hands next.",
        ),
        responses: {
          type: 'array',
          description: 'Two or three options. Small and concrete enough to do while activated.',
          items: {
            type: 'object',
            properties: {
              text: str('The move.'),
              caveat: str('The honest reason it might not work.'),
            },
            required: ['text'],
          },
        },
        protocols: {
          type: 'array',
          description:
            'If-then pairs, followable without thinking, because thinking is unavailable when these are needed.',
          items: {
            type: 'object',
            properties: {
              when: str('The trigger condition, observable.'),
              then: str('The action.'),
            },
            required: ['when', 'then'],
          },
        },
        nodeId: str('The map node this traces back to, if there is one.'),
      },
      required: ['id', 'title', 'showsUpWhen'],
    },
  },

  {
    name: 'update_plan_issue',
    description: 'Revise an existing plan issue — typically to add a response option or protocol.',
    input_schema: {
      type: 'object',
      properties: {
        id: str('The issue id to update.'),
        title: str('New title, if changing.'),
        showsUpWhen: str('New conditions, if changing.'),
        responsibility: str('New responsibility statement, if changing.'),
        responses: {
          type: 'array',
          description: 'Replaces the existing options entirely when provided.',
          items: {
            type: 'object',
            properties: { text: str('The move.'), caveat: str('Why it might not work.') },
            required: ['text'],
          },
        },
        protocols: {
          type: 'array',
          description: 'Replaces the existing protocols entirely when provided.',
          items: {
            type: 'object',
            properties: { when: str('The condition.'), then: str('The action.') },
            required: ['when', 'then'],
          },
        },
      },
      required: ['id'],
    },
  },

  {
    name: 'add_anticipation',
    description:
      "Name a way this is likely to fail, before it does. Include the unflattering ones: it'll feel fake, a bad week will erase two good ones, they'll decide the map was wrong the first time it doesn't apply, someone close to them will resist the change. The reply should hold up on a bad day rather than encourage.",
    input_schema: {
      type: 'object',
      properties: {
        id: str('Short stable slug.'),
        objection: str('The objection or failure mode, in the voice it will actually arrive in.'),
        reply: str('What genuinely answers it. Not a pep talk.'),
      },
      required: ['id', 'objection', 'reply'],
    },
  },

  {
    name: 'add_mission',
    description:
      'Add a small experiment to run in real life. Three active missions is many. The success condition must be answerable yes/no from outside, without self-interpretation — that faculty is exactly what the dream compromises.',
    input_schema: {
      type: 'object',
      properties: {
        id: str('Short stable slug.'),
        title: str('The mission, small and concrete.'),
        why: str('The reason, traced to a specific part of the map.'),
        cadence: str('How often, e.g. "once this week", "whenever it comes up".'),
        successLooksLike: str('Observable from outside. Not "feel less anxious".'),
        issueId: str('The plan issue this serves, if any.'),
      },
      required: ['id', 'title'],
    },
  },

  {
    name: 'update_mission',
    description:
      'Revise a mission or retire it by setting active to false. Retiring a mission that is not working is a normal outcome, not a failure.',
    input_schema: {
      type: 'object',
      properties: {
        id: str('The mission id.'),
        title: str('New title, if changing.'),
        why: str('New rationale, if changing.'),
        cadence: str('New cadence, if changing.'),
        successLooksLike: str('New success condition, if changing.'),
        active: { type: 'boolean', description: 'Set false to retire it.' },
      },
      required: ['id'],
    },
  },

  {
    name: 'log_checkin',
    description:
      "Record how a mission actually went. 'did-not-happen' is data, not a confession — log it without comment and stay curious. Interrogate the successes as hard as the failures: a mission that went well because the situation never arose is not evidence.",
    input_schema: {
      type: 'object',
      properties: {
        missionId: str('The mission being reported on.'),
        status: {
          type: 'string',
          enum: ['went-well', 'mixed', 'did-not-happen', 'harder-than-expected'],
        },
        note: str('What actually happened, specifically.'),
      },
      required: ['missionId', 'status', 'note'],
    },
  },

  {
    name: 'add_practice',
    description:
      'Add a practice aimed at a specific part of their map rather than at meditation in general. Instructions must include what it feels like when it is going badly — boredom and doubt are the ordinary experience, and people quit for lack of being told so.',
    input_schema: {
      type: 'object',
      properties: {
        id: str('Short stable slug.'),
        name: str('Plain name, no mysticism.'),
        instructions: str(
          'Real instructions: what to do with attention, and what it feels like both when it works and when it does not.',
        ),
        duration: str('e.g. "five minutes", "whenever you notice the grip".'),
        aimedAt: str('What in their map this is meant to loosen.'),
      },
      required: ['id', 'name', 'instructions'],
    },
  },

  {
    name: 'update_practice',
    description: 'Revise a practice after they have tried it and reported back.',
    input_schema: {
      type: 'object',
      properties: {
        id: str('The practice id.'),
        name: str('New name, if changing.'),
        instructions: str('New instructions, if changing.'),
        duration: str('New duration, if changing.'),
        aimedAt: str('New aim, if changing.'),
      },
      required: ['id'],
    },
  },

  {
    name: 'propose_stage_complete',
    description:
      "Signal that you believe this stage has done its work. This only ever *proposes* — the person decides when a stage ends, and they may keep going as long as they like. Say the same thing in your reply, in plain language. Never call this to move things along, and never press after calling it once.",
    input_schema: {
      type: 'object',
      properties: {
        summary: str('An honest few sentences on what this stage produced, including what is still thin or unresolved.'),
      },
      required: ['summary'],
    },
  },
]

/** The tool subset a given stage is allowed to use. */
export function toolsForStage(names: string[]): Tool[] {
  return ALL_TOOLS.filter((t) => names.includes(t.name))
}

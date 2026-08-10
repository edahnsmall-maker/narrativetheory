'use client'

import { useState } from 'react'
import type { DreamMap as DreamMapData, MapNode } from '@/lib/program/types'
import {
  BAND_LINE_H,
  GUTTER,
  KIND_COLOR,
  LINE_H,
  MARGIN_X,
  layoutMap,
} from '@/lib/program/layout'

/**
 * The map as a single static diagram. It is authored entirely by the guide —
 * nothing here is draggable, and changes are made by saying so in the
 * conversation. That keeps one account of the dream rather than two.
 */
export default function DreamMap({ map }: { map: DreamMapData }) {
  const [selected, setSelected] = useState<MapNode | null>(null)
  const { nodes, edges, bands, width, height } = layoutMap(map)

  if (!nodes.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
        <div className="mb-4 h-12 w-12 rounded-full border border-dashed border-[var(--rule)]" />
        <p className="max-w-xs text-sm text-[var(--muted-foreground)]">
          The map builds itself here as you and the guide work out what&rsquo;s running. Nothing
          appears until there&rsquo;s something worth putting down.
        </p>
      </div>
    )
  }

  const detail = selected && nodes.find((n) => n.id === selected.id)

  return (
    <div className="flex h-full flex-col">
      {(map.title || map.thesis) && (
        <header className="border-b border-[var(--rule)] px-6 py-5">
          {map.title && (
            <h2 className="font-display text-xl tracking-tight">{map.title}</h2>
          )}
          {map.thesis && (
            <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-[var(--muted-foreground)]">
              {map.thesis}
            </p>
          )}
        </header>
      )}

      <div className="flex-1 overflow-auto p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          className="max-w-full"
          role="img"
          aria-label={map.thesis ? `Dream map: ${map.thesis}` : 'Dream map'}
        >
          <defs>
            <marker
              id="dm-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 7 4 L 0 7 z" fill="var(--ink)" opacity="0.4" />
            </marker>
          </defs>

          {/* Band labels in the left gutter. */}
          {bands.map((band) => (
            <g key={band.kind}>
              <line
                x1={GUTTER + MARGIN_X - 12}
                y1={band.y - 10}
                x2={width - MARGIN_X}
                y2={band.y - 10}
                stroke="var(--rule)"
                strokeDasharray="2 4"
              />
              {band.labelLines.map((line, index) => (
                <text
                  key={index}
                  x={MARGIN_X}
                  y={
                    band.y +
                    band.h / 2 -
                    ((band.labelLines.length - 1) * BAND_LINE_H) / 2 +
                    index * BAND_LINE_H
                  }
                  dominantBaseline="middle"
                  className="fill-[var(--muted-foreground)]"
                  style={{ fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                >
                  {line}
                </text>
              ))}
            </g>
          ))}

          {edges.map((edge) => (
            <g key={edge.id}>
              <path
                d={edge.path}
                className="diagram-arrow"
                markerEnd="url(#dm-arrow)"
                strokeDasharray={edge.isLoop ? '4 3' : undefined}
              />
              {edge.label && (
                // paint-order puts the stroke behind the glyphs, so the label
                // knocks a clean hole in the line it sits on.
                <text
                  x={edge.labelX}
                  y={edge.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-[var(--muted-foreground)]"
                  stroke="var(--card)"
                  strokeWidth={5}
                  paintOrder="stroke"
                  transform={
                    edge.isLoop ? `rotate(-90 ${edge.labelX} ${edge.labelY})` : undefined
                  }
                  style={{ fontSize: 10 }}
                >
                  {edge.label}
                </text>
              )}
            </g>
          ))}

          {nodes.map((node) => {
            const isProposed = node.confidence === 'proposed'
            const isSelected = detail?.id === node.id
            return (
              <g
                key={node.id}
                onClick={() => setSelected(isSelected ? null : node)}
                style={{ cursor: node.detail ? 'pointer' : 'default' }}
                tabIndex={node.detail ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelected(isSelected ? null : node)
                  }
                }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={10}
                  fill={KIND_COLOR[node.kind]}
                  fillOpacity={isProposed ? 0.22 : 0.5}
                  stroke={isSelected ? 'var(--accent-violet)' : 'var(--ink)'}
                  strokeOpacity={isSelected ? 1 : 0.18}
                  strokeWidth={isSelected ? 1.75 : 1}
                  strokeDasharray={isProposed ? '5 3' : undefined}
                />
                {node.lines.map((line, index) => (
                  <text
                    key={index}
                    x={node.x + node.w / 2}
                    y={
                      node.y +
                      node.h / 2 -
                      ((node.lines.length - 1) * LINE_H) / 2 +
                      index * LINE_H
                    }
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-[var(--ink)]"
                    style={{ fontSize: 12.5, fontWeight: isProposed ? 400 : 500 }}
                  >
                    {line}
                  </text>
                ))}
                {node.detail && (
                  <circle
                    cx={node.x + node.w - 11}
                    cy={node.y + 11}
                    r={2}
                    fill="var(--ink)"
                    opacity={0.3}
                  />
                )}
              </g>
            )
          })}
        </svg>
      </div>

      <footer className="border-t border-[var(--rule)] px-6 py-3">
        {detail ? (
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-sm">{detail.label}</span>
              <span className="chip shrink-0">
                {detail.confidence === 'confirmed' ? 'confirmed' : 'still a guess'}
              </span>
            </div>
            {detail.detail && (
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {detail.detail}
              </p>
            )}
          </div>
        ) : (
          <p className="text-xs text-[var(--muted-foreground)]">
            Dashed outlines are still guesses. Solid ones you&rsquo;ve agreed with. Say what&rsquo;s
            wrong and the guide will change it.
          </p>
        )}
      </footer>
    </div>
  )
}

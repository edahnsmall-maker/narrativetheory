import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-display text-2xl text-foreground mb-1">Narrative Theory</div>
          <div className="text-sm text-muted-foreground">Sign in to continue</div>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-card border shadow-none rounded-2xl',
              headerTitle: 'text-foreground font-display',
              headerSubtitle: 'text-muted-foreground',
              formButtonPrimary: 'bg-primary text-primary-foreground hover:opacity-90',
              formFieldInput: 'bg-background border text-foreground',
              footerActionLink: 'text-accent-violet',
            },
          }}
        />
      </div>
    </div>
  )
}

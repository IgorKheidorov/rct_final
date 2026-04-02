interface PersonCardProps {
  name: string
  role?: string
  degree?: string
  phone?: string
  email?: string
  photo?: string
  scopus?: string
  scholar?: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0]?.[0]?.toUpperCase() ?? '?'
}

export default function PersonCard({
  name,
  role,
  degree,
  phone,
  email,
  photo,
  scopus,
  scholar,
}: PersonCardProps) {
  const initials = getInitials(name)
  const roleDegree = [role, degree].filter(Boolean).join(', ')

  return (
    <div className="flex items-start gap-4 py-5 border-b border-border-col last:border-0 not-prose">
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-border-col"
        />
      ) : (
        <div
          className="w-16 h-16 rounded-full bg-accent flex items-center justify-center flex-shrink-0 select-none"
          aria-hidden="true"
        >
          <span className="font-display text-text-primary text-lg leading-none">{initials}</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-base text-text-primary leading-snug mb-0.5">{name}</h3>

        {roleDegree && (
          <p className="text-sm text-text-secondary mb-2">{roleDegree}</p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {phone && (
            <a
              href={`tel:${phone.replace(/[\s()\-]/g, '')}`}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-accent hover:underline"
            >
              {email}
            </a>
          )}
          {scopus && (
            <a
              href={scopus}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Scopus ↗
            </a>
          )}
          {scholar && (
            <a
              href={scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Google Scholar ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

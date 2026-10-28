import Icon from "./icon";
const profiles = [
  { name: "GitHub", icon: "github", href: "https://github.com/mukbalin" },
  {
    name: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/mukhtar-bello-bb983636b/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/muk_bal23/",
  },
];
export default function SocialLinks({ compact = false }) {
  return (
    <div className={compact ? "social-icons" : "social-links"}>
      {profiles.map((profile) => (
        <a
          key={profile.name}
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${profile.name} (opens in a new tab)`}
          title={profile.name}
        >
          <Icon name={profile.icon} size={18} />
          {!compact && (
            <>
              <span>{profile.name}</span>
              <Icon name="diagonal" size={12} />
            </>
          )}
        </a>
      ))}
    </div>
  );
}

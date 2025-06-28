'use client'
import { useGetAllDevelopers } from '@/hooks/services-hook/use-developer.service.hook';

function DevelopersWrapper() {
  const { data, isLoading, error } = useGetAllDevelopers({});
  console.log("data", data)
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>NO Data availabe</div>;
  if (error) return <div>Error loading developers.</div>;

  const developers = data?.data?.data?.data || [];

  return (
    <div>
      <h1>Developers</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {developers.map((dev: any) => (
          <div
            key={dev.id}
            style={{
              border: '1px solid #eee',
              borderRadius: 8,
              padding: 16,
              width: 320,
              background: '#fafafa',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img
                src={dev.avatar || 'https://i.pravatar.cc/100'}
                alt={dev.name}
                width={64}
                height={64}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h2 style={{ margin: 0 }}>{dev.name}</h2>
                <div style={{ color: '#888', fontSize: 14 }}>{dev.bio}</div>
              </div>
            </div>
            <div style={{ margin: '12px 0' }}>
              {dev.skills?.map((skill: string) => (
                <span
                  key={skill}
                  style={{
                    display: 'inline-block',
                    background: '#e0e7ff',
                    color: '#3730a3',
                    borderRadius: 4,
                    padding: '2px 8px',
                    marginRight: 6,
                    fontSize: 13,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              {dev.social?.github && (
                <a href={dev.social.github} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>
                  <img src="/icons/github.svg" alt="GitHub" width={20} height={20} />
                </a>
              )}
              {dev.social?.twitter && (
                <a href={dev.social.twitter} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>
                  <img src="/icons/twitter.svg" alt="Twitter" width={20} height={20} />
                </a>
              )}
              {dev.social?.linkedin && (
                <a href={dev.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>
                  <img src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} />
                </a>
              )}
              {dev.social?.website && (
                <a href={dev.social.website} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>
                  <img src="/icons/link.svg" alt="Website" width={20} height={20} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevelopersWrapper

/**
 * Generate avatar URL from user's name
 * Uses UI Avatars API to create initials-based avatar
 * Falls back to user icon if no name provided
 */
export const getAvatarUrl = (name, size = 150) => {
  if (!name) {
    // Generic user icon avatar
    return `https://ui-avatars.com/api/?name=User&size=${size}&background=random&color=fff&bold=true`
  }

  // Generate avatar from user's name
  const encodedName = encodeURIComponent(name)
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=random&color=fff&bold=true`
}

Refactor the existing `/app/account/page.tsx` into separate components.
The current code is a single "use client" file — we need to split it so that
Server Components handle data fetching, and "use client" only where truly needed.

---

## Current file location
`/app/account/page.tsx`

---

## Target structure after refactor

app/account/
├── page.tsx                          ← Server Component (new)
└── _components/
    ├── AccountHeader.tsx             ← Server Component (static)
    ├── UserSection.tsx               ← Server Component (fetch DB here)
    ├── EditProfileButton.tsx         ← Server Component (just a Link, no interactivity)
    ├── ProfileCompletion.tsx         ← Server Component (static logic)
    └── AccountMenu.tsx               ← Server Component (static links)

NOTE: BottomNavbar/Footer is already a separate component, leave it as is.

---

## Refactor rules per component

### `page.tsx` (NEW - Server Component)
- Remove "use client"
- Fetch session using your auth library (e.g. `getServerSession(authOptions)`)
- Fetch user profile from DB directly (e.g. `getUserById(session.user.id)`) — 
  REPLACE the current `useEffect → fetch("/api/user/profile")` pattern
- Pass data as props to child components
- No useState, no useEffect
- Example shape:
```tsx
  export default async function AccountPage() {
    const session = await getServerSession(authOptions);
    const user = await getUserFromDB(session.user.id);
    return (
      <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">
        <AccountHeader />
        <UserSection name={user.name} imageUrl={user.image} joinDate={user.created_at} />
        <EditProfileButton />
        <ProfileCompletion completedSteps={2} totalSteps={6} />
        <AccountMenu />
        <Footer />
      </div>
    );
  }
```

---

### `_components/AccountHeader.tsx` — Server Component
- Extract this block from current page.tsx:
```tsx
  <div className="flex items-center gap-2 px-5 pt-5 pb-4">
    <Image src="/brand/logo-souqmasisir.png" ... />
    <span>MasisirPedia</span>
  </div>
```
- No props needed, fully static

---

### `_components/UserSection.tsx` — Server Component
- Props: `{ name: string, imageUrl: string | null, joinDate: string }`
- `joinDate` is already formatted (formatJoinDate called in page.tsx before passing)
- Extract avatar + name + join date block from current page.tsx
- Import HiUser from "react-icons/hi" — this is fine in Server Component (no hooks used)

---

### `_components/EditProfileButton.tsx` — Server Component
- Extract the `<Link href="/account/profile">View and Edit Profile</Link>` block
- No props needed, fully static
- It's just a Link, NOT a button with onClick, so no "use client" needed

---

### `_components/ProfileCompletion.tsx` — Server Component
- Props: `{ completedSteps: number, totalSteps: number }`
- Move the constants TOTAL_STEPS and COMPLETED_STEPS to page.tsx, pass as props
- Extract the progress bar + "steps left" + subtitle block

---

### `_components/AccountMenu.tsx` — Server Component
- No props needed, fully static
- Extract the About Us and Settings <Link> blocks
- Keep all imports (HiUserGroup, IoSettingsOutline, HiChevronRight)

---

## Important rules
- Do NOT add "use client" unless the component uses useState, useEffect, or browser events
- All components in this refactor are Server Components (no interactivity)
- Keep all existing Tailwind classes exactly as they are — do not restyle anything
- Keep all existing imports per component (Image, Link, icons) — just move them to the right file
- After refactor, the UI must look 100% identical to before
- Delete the old "use client", useState, useEffect, and useSession from page.tsx
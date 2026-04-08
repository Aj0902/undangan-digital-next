# 🎬 Viding Engine v3.0 - Implementasi Status & Roadmap

**Status**: Fase 1 (Core Rendering) - 70% Complete | Build Error: BLOCKER
**Last Updated**: April 8, 2026  
**Target**: "The Ultimate Invitation Builder: Transformasi Undangan Digital Menjadi Pengalaman Sinematik Interaktif"

---

## 📖 Visi Produk

### Filosofi: "Contextual No-Code"

Viding Engine v3.0 **bukan sekedar page builder statis**. Kami membangun **Mesin Kreativitas (SaaS)** yang menggabungkan:

- **Kebebasan Desain Tingkat Lanjut** → User bisa posisikan elemen dengan presisi milimeter (X-Y %)
- **Stabilitas Kode Modern** → Arsitektur berbasis Next.js, Zustand, TypeScript type-safe
- **No-Code untuk Awam** → Drag-drop, live preview, contextual UI yang tidak membingungkan
- **Professional Output** → Hasil design terlihat premium tanpa risiko merusak layout

### Diferensiator Utama

Versus builder tradisional:

| Aspek | Traditional | Viding Engine v3.0 |
|-------|------------|-------------------|
| **UI Complexity** | Toolbar penuh 50+ button | Contextual Panel (hanya alat relevan yang muncul) |
| **Section Isolation** | Perubahan global, berisiko | Sandbox scope per-section |
| **Video Support** | Jarang/limited | Aurora video loader dengan transisi smooth |
| **Motion Presets** | Click-based | Looping animations (float, pulse) |
| **Ordering** | File structure | Drag-reorder live dengan sectionOrder array |
| **Export** | HTML file | JSON to Supabase + CDN delivery |

---

## 🏗️ Architecture Inti

### Single Source of Truth: VidingDocument

```typescript
VidingDocument v3.0 {
  id: uuid
  version: "3.0"
  createdAt: ISO8601
  updatedAt: ISO8601
  
  sectionOrder: ["cover-1", "mempelai-1", "galeri-1"]    // Urutan render
  
  sections: {                                            // Isolasi per-ID
    "cover-1": CoverSection { 
      background: { type: "video|image", url, effect: "aurora" }
      content: { mainText, subText, ctaButton }
      ornaments: [{ position.x%, position.y%, animation: "float|pulse" }]
    }
    "mempelai-1": MempelaiSection {
      content: { pria: {name, photo}, wanita: {name, photo}, story }
      ornaments: [...]
    }
    "galeri-1": GaleriSection {
      content: { title, images: [], description }
      ornaments: [...]
    }
  }
  
  globalSettings: {
    primaryColor: "#1a2e25"
    accentColor: "#d4af37"
    fontFamily: "Cormorant Garamond"
    breakpoints: { mobile, tablet, desktop }
  }
}
```

### Block-Level Inspector Pattern

```
User Click Section/Ornament
    ↓
Trigger: selectOrnament(id) → Store
    ↓
Inspector Panel Re-render (ONLY relevant controls)
    ↓
User Adjust X/Y Slider
    ↓
Real-time: updateOrnament({x: new, y: new}) → Store
    ↓
Canvas Preview Live Sync (no page reload)
    ↓
Save: Publish JSON to Supabase (one-click)
```

### Tech Stack (Modern SaaS Ready)

```
Frontend:
├─ Next.js 16 (App Router, SSG/ISR)
├─ Zustand (state management - lightweight)
├─ Framer Motion (animations)
└─ Tailwind CSS (styling)

Backend/Data:
├─ Supabase (PostgreSQL + RLS + Auth)
├─ Cloudinary (image/video CDN + auto-optimize)
└─ Edge Network (Vercel for global distribution)

Build:
├─ TypeScript (type-safe)
├─ Zod (runtime schema validation)
└─ Turbopack (fast rebuild)
```

---

## ✅ Fase 1: Core Rendering Engine (70% Complete)

### Completed ✅

#### 1. Type Definitions & Schema
- **MempelaiSection** - Two-person profile layout (pria + wanita + story)
- **GaleriSection** - Image gallery dengan responsive grid
- **Enhanced CoverSection** - Video background dengan Aurora loader, effect types
- **Updated globalSettings** - Primary color, accent color, font, breakpoints
- **Changed to Record Pattern** - sections: `Record<string, Section>` + `sectionOrder: string[]`

```typescript
// BEFORE (❌ Old)
sections: Section[]

// AFTER (✅ New)
sectionOrder: ["cover-1", "mempelai-1"]
sections: {
  "cover-1": { type: "cover", ... },
  "mempelai-1": { type: "mempelai", ... }
}
```

#### 2. Section Renderers (3 Components)

**CoverSectionRenderer**
- Background image + video support
- Aurora video loader (conic-gradient animation saat loading)
- CTA button dengan hover effect
- Ornament overlay support

**MempelaiSectionRenderer**
- Side-by-side layout (pria ← | → wanita)
- Circular avatar dengan fallback
- Name + parents text
- Love story paragraph

**GaleriSectionRenderer**
- Responsive grid (2 mobile, 3 tablet, 4 desktop)
- Hover zoom effect pada images
- Gallery description
- Ornament support

#### 3. Motion Presets (Framer Motion)

```typescript
MOTION_PRESETS {
  fadeIn           // opacity: 0 → 1
  slideInUp        // y: 20 → 0 (dengan fade)
  zoomIn           // scale: 0.8 → 1
  rotate           // rotate: -10 → 0
  bounce           // stagger animation
  
  ✨ NEW:
  float            // y: [-10, 10, -10] (loop infinite)
  pulse            // scale: [1, 1.1, 1] (loop infinite)
}
```

#### 4. Ornament Positioning System

- **Percentage-based coordinates**: X ∈ [-50, 150]%, Y ∈ [-50, 150]%
- **Bleed effect support**: Negative values untuk aesthetic cutoff
- **Properties per ornament**:
  - position: {x: %, y: %}
  - size: {width: px, height: px}
  - rotation: 0-360°
  - opacity: 0-1
  - zIndex: stacking order
  - animation: float|pulse|other presets

---

## 🔴 Critical Blockers (Fase 1 Incomplete)

### Issue 1: Build Type Error ❌

**File**: `src/app/builder/page.tsx:15`  
**Error**: Data struktur mismatch

```typescript
// ❌ WRONG (saat ini)
const INITIAL_DOCUMENT: VidingDocument = {
  sections: [
    { type: "cover", id: "cover-1", ... }
  ]
}

// ✅ CORRECT (harus)
const INITIAL_DOCUMENT: VidingDocument = {
  sectionOrder: ["cover-1"],
  sections: {
    "cover-1": { type: "cover", ... }
  }
}
```

**Impact**: `npm run build` fails immediately  
**Fix Complexity**: 30 minutes

---

### Issue 2: Store Method Type Error ❌

**File**: `src/store/useBuilderStore.ts:145-160`  
**Method**: `updateSection()`  
**Error**: Discriminated union type mismatch

```typescript
// Problem: TypeScript can't discriminate between:
// { type: "cover"; content: CoverContent; ... }
// { type: "mempelai"; content: MempelaiContent; ... }

// When you do: Partial<Section>
// TS tidak tahu apakah update untuk cover atau mempelai
```

**Solution Options**:
1. Create type-specific methods: `updateCoverSection()`, `updateMempelaiSection()`
2. Use type guards: Check `section.type` sebelum merge updates
3. Overload pattern: Multiple signatures

**Fix Complexity**: 1-2 hours  
**Recommended**: Option 1 (explicit & safe)

---

### Issue 3: Template Renderer Null Check ❌

**File**: `src/templates/viding-v3/index.tsx:54`

```typescript
// Problem: sections[id] bisa undefined
return <div>{
  document.sectionOrder
    .map((id) => renderSection(document.sections[id]))  // ⚠️ Could be undefined
    .filter(Boolean)
}</div>
```

**Fix Complexity**: 15 minutes

---

## ⏳ Fase 2: Builder UI & Interaction (0% - BLOCKED)

### Core Feature Tasks

#### 2.1 PropertyControls ↔ Store Binding
- **NumericSlider** → Wire to `updateOrnament(x, y)` action
- **ColorPicker** → Wire to ornament color properties
- **DropdownSelect** → Section type selection
- **ToggleSwitch** → Animation toggle
- **Live Preview Sync** → Canvas updates tanpa page reload

#### 2.2 Contextual Inspector Panel
- Show/hide berdasarkan selected element
- **Ornament Controls**: X, Y, Rotation, Opacity, Scale, Z-Index
- **Section Controls**: Background image upload, content text, layout type
- **Global Controls**: Primary color, accent, font family

#### 2.3 Section Content Editor
- **Cover**: MainText input, SubText, CTA button label
- **Mempelai**: Pria/Wanita names, parents, photos upload, story textarea
- **Galeri**: Add/remove images, title, description

#### 2.4 Layer Panel (Visual Hierarchy)
- Tree view: Sections → Ornaments
- Visibility toggle per item
- Lock/unlock
- Selection sync dengan canvas

#### 2.5 Section Reordering
- Drag-drop entre sections di layer panel
- Update `sectionOrder` array live
- Persist changes to store

#### 2.6 Advanced Canvas Controls
- **Grid visualization** dengan snap-to-grid option
- **Alignment guides** (vertical/horizontal snapping)
- **Zoom controls** (slider + preset: 50%, 100%, 150%, fit-to-screen)
- **Responsive preview toggle** (mobile/tablet/desktop)

#### 2.7 Keyboard Shortcuts
```
Arrow Keys          → Nudge selected element (1px)
Shift + Arrow       → Nudge 10px
Delete              → Delete selected
Ctrl/Cmd + D        → Duplicate ornament
Ctrl/Cmd + Z        → Undo
Ctrl/Cmd + Shift+Z  → Redo
Ctrl/Cmd + A        → Select all
Escape              → Deselect
```

---

## 🌐 Fase 3: Cloud Integration & Production (0%)

### 3.1 Supabase Integration
```sql
-- Tables needed:
undangan_draft {
  id: uuid
  client_id: uuid (FK)
  name: string
  document_json: jsonb
  status: draft|published
  created_at, updated_at
  
  RLS Policy:
  - Users can only see own undangan
  - Public can view published
}
```

**Actions**:
- `saveDraft()` → INSERT/UPDATE undangan_draft
- `loadDraft(id)` → FETCH document
- `publishDraft()` → SET status = published

### 3.2 Cloudinary Upload
- **Endpoint**: POST `/api/upload` → Cloudinary API
- **Auto-Folder**: `undangan-digital/{clientSlug}/{mediaKey}`
- **Auto-Quality**: Cloudinary transformations
  - Images: Auto-format (webp/avif), max-width 2000px
  - Videos: Auto-bitrate, auto-resolution
- **Usage**: Store returned URL in ornament/background

### 3.3 Undo/Redo System
```typescript
ActionHistory {
  past: Action[]
  present: VidingDocument
  future: Action[]
}

Action {
  type: "UPDATE_ORNAMENT" | "DELETE_SECTION" | ...
  payload: {...}
  timestamp: ISO8601
}
```

### 3.4 Performance Optimization
- React.memo pada section renderers
- useMemo untuk motion variants
- Lazy load section components
- Image lazy loading via Next.js Image
- Code splitting untuk builder vs preview

### 3.5 Error Boundaries & Validation
- Section-level error boundary
- Ornament render fallback
- Form validation (email, dates)
- Network error retry logic

---

## 📋 Implementation Roadmap (Detailed)

### Sprint 1: Fix Build + Fase 1 Complete (1-2 days)

```
Day 1:
├─ [30 min] Fix builder/page.tsx data structure
├─ [1h]    Fix store/useBuilderStore.ts type safety
├─ [15 min] Fix viding-v3/index.tsx null checks
├─ [30 min] Test build: npm run build
└─ [30 min] Verify all 3 sections render in preview

Day 2:
├─ [1h]    Test Aurora video loader with real video
├─ [1h]    Test motion presets (float, pulse animations)
├─ [1h]    Test ornament drag-drop positioning
└─ [1h]    Create fixture data for testing
```

### Sprint 2: Fase 2 Part A - Core Wiring (2-3 days)

```
├─ [2h]    Wire NumericSlider → updateOrnament action
├─ [2h]    Wire ColorPicker → ornament color
├─ [2h]    Build Inspector panel toggle logic
├─ [2h]    Test live preview sync
├─ [2h]    Create section content editor form
└─ [2h]    Build layer panel component
```

### Sprint 3: Fase 2 Part B - Advanced UI (2-3 days)

```
├─ [2h]    Drag-drop section reordering
├─ [2h]    Grid + snap-to-grid visualization
├─ [2h]    Responsive canvas preview
├─ [2h]    Keyboard shortcuts engine
└─ [2h]    Ornament library picker UI
```

### Sprint 4: Fase 3 - Cloud Ready (2-3 days)

```
├─ [2h]    Supabase database setup + RLS
├─ [2h]    Save/Load endpoints
├─ [2h]    Cloudinary upload integration
├─ [2h]    Undo/Redo system
└─ [2h]    Performance optimizations
```

---

## 🚀 How to Continue (For Next Developer)

### Prerequisite Knowledge
- TypeScript + Zod schemas
- React hooks + Framer Motion
- Zustand store patterns (middleware, devtools)
- Next.js App Router
- Tailwind CSS utility-first

### Starting Point (After Build Fixed)

1. **Understand Data Flow**:
   ```
   Builder Page
   ├─ Loads INITIAL_DOCUMENT
   └─ Pass to useBuilderStore
   
   Store (Zustand)
   ├─ Holds activeDocument + selectedIds
   └─ Actions: setActiveDoc, updateOrnament, updateSection, etc
   
   Canvas
   ├─ Reads activeDocument from store
   ├─ sectionOrder.map → renderSection
   └─ Each section manages own ornaments
   
   Inspector
   ├─ Watches selectedOrnamentId
   └─ Shows PropertyControls
   ```

2. **Key Files to Understand**:
   - `src/types/viding-v3.ts` - Everything starts here
   - `src/store/useBuilderStore.ts` - State management hub
   - `src/templates/viding-v3/index.tsx` - Main renderer logic
   - `src/components/builder/BuilderLayout.tsx` - UI layout

3. **Testing Strategy**:
   - Manual test each section type (cover, mempelai, galeri)
   - Verify animations play correctly
   - Test ornament positioning with edge cases (-50%, 150%)
   - Check responsive behavior

4. **Common Patterns**:

   ```typescript
   // Wire UI to store
   const { activeDocument, updateOrnament } = useBuilderStore();
   
   // Get selected element
   const selected = activeDocument.sections[selectedSectionId]?.ornaments.find(
     o => o.id === selectedOrnamentId
   );
   
   // Update store
   const handlePositionChange = (x: number) => {
     updateOrnament(selectedSectionId, selectedOrnamentId, { 
       position: { ...selected.position, x } 
     });
   };
   ```

---

## 📦 What You Have Now (Complete)

### Types & Schema ✅
- [x] VidingDocument with sectionOrder + record sections
- [x] CoverSection (with video background)
- [x] MempelaiSection (pria + wanita)
- [x] GaleriSection (images array)
- [x] Ornament with animation support
- [x] Motion presets (7 types)

### Components ✅
- [x] CoverSectionRenderer
- [x] MempelaiSectionRenderer
- [x] GaleriSectionRenderer
- [x] OrnamentRenderer (with drag-drop)
- [x] PropertyControls (NumericSlider, ColorPicker, etc)
- [x] BuilderLayout (Canvas + Inspector)

### Infrastructure ✅
- [x] Zustand store with 30+ actions
- [x] Motion presets with variants
- [x] Cloudinary client
- [x] Supabase client
- [x] TypeScript strict mode

### Still Needed ❌
- [ ] Fix 3 build errors (critical blocker)
- [ ] Section content editor
- [ ] Layer panel
- [ ] Drag-drop reordering
- [ ] Supabase integration
- [ ] Persistence layer
- [ ] Undo/Redo

---

## 🔗 Database Schema (For Fase 3)

```sql
CREATE TABLE undangan_drafts (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  name VARCHAR(255),
  document JSONB NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, published
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE POLICY "Users can access own undangan"
  ON undangan_drafts
  FOR SELECT USING (
    created_by = auth.uid() OR 
    client_id IN (
      SELECT id FROM clients WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Users can insert own undangan"
  ON undangan_drafts
  FOR INSERT WITH CHECK (
    created_by = auth.uid()
  );
```

---

## 🎯 Success Criteria (Definition of Done)

### Fase 1 Complete ✅
- [ ] `npm run build` succeeds without errors
- [ ] 3 section types render in preview page
- [ ] Aurora video loader visible on video backgrounds
- [ ] Motion animations play (float, pulse visible)
- [ ] Ornament drag-drop works in canvas

### Fase 2 Complete ✅
- [ ] Click ornament → Inspector shows X/Y controls
- [ ] Drag NumericSlider → ornament position updates in real-time
- [ ] Layer panel shows all sections + ornaments
- [ ] Can drag section to reorder in layer panel
- [ ] Section content editor updates preview live
- [ ] Keyboard shortcuts work (Delete, Arrow keys)

### Fase 3 Complete ✅
- [ ] Click "Save" → JSON stored to Supabase
- [ ] Click "Load" → Fetch & render undangan from database
- [ ] Upload image → Goes through Cloudinary, URL stored
- [ ] Undo/Redo works (visible changes revert/re-apply)
- [ ] Lighthouse score > 90
- [ ] Mobile responsive (<640px works correctly)

---

## 💡 Quick Mental Model

Think of Viding Engine as:

```
┌─────────────────────────────────────────────┐
│       USER (Content Creator)                │
└─────────────────────────────────────────────┘
                    ↓
        (Drag position X/Y sliders)
                    ↓
┌─────────────────────────────────────────────┐
│   BUILDER UI (React Components)             │
│   ├─ PropertyControls (Sliders)             │
│   ├─ Inspector Panel (Context)              │
│   ├─ Layer Panel (Hierarchy)                │
│   └─ Canvas (Live Preview)                  │
└─────────────────────────────────────────────┘
                    ↓
        (updateOrnament action dispatch)
                    ↓
┌─────────────────────────────────────────────┐
│    STATE MANAGEMENT (Zustand Store)         │
│    activeDocument: VidingDocument           │
│    selectedOrnamentId: string               │
│    actions: [...30 mutation funcs]          │
└─────────────────────────────────────────────┘
                    ↓
        (selector re-render only canvas)
                    ↓
┌─────────────────────────────────────────────┐
│   RENDERERS (Framer Motion Components)      │
│   ├─ CoverSectionRenderer                   │
│   ├─ MempelaiSectionRenderer                │
│   ├─ GaleriSectionRenderer                  │
│   └─ OrnamentRenderer                       │
└─────────────────────────────────────────────┘
                    ↓
            (Display to User)
```

---

## 📚 Reference Files

| File | Purpose | Status |
|------|---------|--------|
| `src/types/viding-v3.ts` | Type definitions & schemas | ✅ Complete |
| `src/store/useBuilderStore.ts` | State management (Zustand) | ⚠️ Type errors |
| `src/templates/viding-v3/index.tsx` | Main renderer + routing | ⚠️ Null checks needed |
| `src/templates/viding-v3/sections/cover/index.tsx` | Cover component | ✅ Complete |
| `src/templates/viding-v3/sections/mempelai/index.tsx` | Mempelai component | ✅ Complete |
| `src/templates/viding-v3/sections/galeri/index.tsx` | Galeri component | ✅ Complete |
| `src/components/ornaments/index.tsx` | Ornament renderer | ✅ Complete |
| `src/utils/motion-presets.ts` | Motion animations | ✅ Complete |
| `src/app/builder/page.tsx` | Builder entry point | 🔴 Data structure error |
| `src/components/builder/PropertyControls/` | UI controls | ⚠️ Not wired |

---

## Next Immediate Action

1. **Fix 3 blocking build errors** (1-2 hours)
2. **Run build test**: `npm run build` should succeed
3. **Manual test**: Load builder page, verify sections render
4. **Start Fase 2**: Begin wiring PropertyControls to store

---

**Ready to continue? Files to fix are clearly marked with line numbers above.** ✨

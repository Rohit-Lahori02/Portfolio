export interface ProjectArchitecture {
    hld: string;
    lld: string;
    classDiagram: string;
    dataFlow: string;
    infrastructure: string;
    erDiagram: string;
}

export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    tech: string[];
    year: string;
    status: string;
    image: string;
    github: string;
    live: string | null;
    impact?: string[];
    challenges?: { title: string; description: string; solution: string }[];
    size?: 'small' | 'medium' | 'large';
    color: string;
    architecture?: ProjectArchitecture;
}

export const projects: Project[] = [
    {
        id: '01',
        title: 'Guidera',
        category: 'AI Orchestration',
        description: 'Intelligent LLM routing platform for 50+ models with 70% cost reduction at 95% accuracy.',
        longDescription: 'Guidera is a production-grade AI orchestration platform that routes prompts across 50+ LLMs using a custom PyTorch 3-layer attention transformer for task classification. A cost-performance optimization algorithm cuts inference costs by 70% while maintaining 95% accuracy. Also includes a full multimodal pipeline (CLIP, OCR, DenseCap) with a two-stage GPT-4.1 compliance engine for GDPR/HIPAA PII detection and redaction.',
        tech: ['PyTorch', 'Python', 'CLIP', 'OCR', 'DenseCap', 'GPT-4.1', 'FastAPI', 'Docker'],
        year: '2025',
        status: 'Live',
        image: '/guidera-viz.png',
        github: 'https://github.com/Rohit-Lahori02',
        live: 'https://guidera.tilantra.com/',
        impact: ['70% Cost Reduction', '95% Accuracy', '50+ LLMs Supported', 'GDPR/HIPAA Compliant'],
        challenges: [
            {
                title: 'LLM Routing at Scale',
                description: 'Selecting the optimal LLM per prompt in real time without adding latency or cost.',
                solution: 'Trained a 3-layer PyTorch attention transformer as a prompt classifier. Routes to the cheapest capable model, achieving 70% cost reduction with <50ms overhead.'
            },
            {
                title: 'Multimodal Compliance',
                description: 'Ensuring GDPR/HIPAA compliance across mixed image, text, and document inputs.',
                solution: 'Built a two-stage engine: CLIP + DenseCap for content understanding, then GPT-4.1 for policy validation and automated PII redaction before any data leaves the pipeline.'
            }
        ],
        size: 'large',
        color: 'from-blue-500/20 to-violet-500/20',
        architecture: {
            hld: `flowchart TB
    Client["API Client\nREST / SDK"]
    CLS["PyTorch Classifier\n3-Layer Attention Transformer"]
    ROUTER["LLM Router\nCost-Perf Optimizer"]
    LLMs["LLM Pool\nGPT-4.1 | Claude | Gemini | 50+ Models"]
    MULTI["Multimodal Pipeline\nCLIP + OCR + DenseCap"]
    COMP["Compliance Engine\nPII Detector + Redactor"]
    DB[("Result Store\nFastAPI + Docker")]

    Client -->|Prompt / Image| CLS
    CLS -->|Task Category| ROUTER
    ROUTER -->|Optimal Model| LLMs
    Client -->|Multimodal Input| MULTI
    MULTI --> COMP
    COMP -->|Clean Content| LLMs
    LLMs --> DB`,

            lld: `flowchart LR
    subgraph Ingestion
        PI["PromptIngester\nparse\ntokenize"]
        MI["MediaIngester\nCLIP encode\nOCR extract"]
    end
    subgraph Classification
        TC["TaskClassifier\nPyTorch Attn\nforward pass"]
        CO["CostOptimizer\nmodel_scores\nbudget_check"]
    end
    subgraph Compliance
        PD["PIIDetector\nNER + regex"]
        RD["Redactor\nmask + log"]
    end

    PI --> TC
    TC --> CO
    MI --> PD
    PD --> RD
    CO -->|route| LLMs["LLM Dispatch"]`,

            classDiagram: `classDiagram
    class PromptClassifier {
        +Tensor embeddings
        +AttentionLayer[] layers
        +forward(prompt)
        +predict_category()
        +get_confidence()
    }
    class LLMRouter {
        +ModelRegistry registry
        +CostTable costs
        +route(category, budget)
        +score_models()
        +select_optimal()
    }
    class ComplianceEngine {
        +PIIDetector detector
        +Redactor redactor
        +validate(content)
        +redact_pii()
        +log_violation()
    }
    class MultimodalPipeline {
        +CLIPEncoder clip
        +OCREngine ocr
        +DenseCap caption
        +process(image)
        +extract_text()
        +generate_caption()
    }
    LLMRouter --> PromptClassifier : uses
    ComplianceEngine --> MultimodalPipeline : receives`,

            dataFlow: `sequenceDiagram
    participant C as Client
    participant CLS as PyTorch Classifier
    participant RO as LLM Router
    participant CE as Compliance Engine
    participant LLM as Selected LLM
    participant DB as Result Store

    C->>CLS: POST /route {prompt, media?}
    CLS->>CLS: forward() -> task_category
    CLS->>RO: category + budget
    RO->>RO: score_models() -> optimal_model
    C->>CE: media content
    CE->>CE: detect_pii() -> redact()
    CE-->>RO: clean_content
    RO->>LLM: dispatch(prompt, clean_content)
    LLM-->>RO: response
    RO->>DB: log(route, cost, latency)
    RO-->>C: response + metadata`,

            infrastructure: `flowchart TB
    subgraph Client["Clients"]
        API["REST API Consumers"]
    end
    subgraph Docker["Docker Compose"]
        FE["FastAPI Gateway\n:8000"]
        CLS["Classifier Service\nPyTorch :8001"]
        COMP["Compliance Service\n:8002"]
    end
    subgraph External["LLM Providers"]
        OAI["OpenAI GPT-4.1"]
        ANT["Anthropic Claude"]
        GEM["Google Gemini"]
    end

    API -->|HTTPS| FE
    FE --> CLS
    FE --> COMP
    FE -->|Routed| OAI
    FE -->|Routed| ANT
    FE -->|Routed| GEM`,

            erDiagram: `erDiagram
    PROMPT_LOG {
        uuid id PK
        text prompt
        string task_category
        float confidence
        string selected_model
        float cost_usd
        int latency_ms
        timestamp created_at
    }
    COMPLIANCE_LOG {
        uuid id PK
        uuid prompt_id FK
        boolean pii_detected
        string[] redacted_fields
        boolean gdpr_pass
        boolean hipaa_pass
    }
    MODEL_REGISTRY {
        string model_id PK
        string provider
        float cost_per_1k_tokens
        string[] task_categories
        boolean active
    }
    PROMPT_LOG ||--|| COMPLIANCE_LOG : triggers
    PROMPT_LOG }o--|| MODEL_REGISTRY : routed_to`
        }
    },
    {
        id: '02',
        title: 'Capsule Hub',
        category: 'Developer Tool',
        description: 'Chrome extension that captures and injects AI context across ChatGPT, Claude, Gemini, and Gmail.',
        longDescription: 'Capsule Hub is a cross-platform AI context manager shipped as a Chrome extension. It captures conversation context from AI platforms via platform-specific injectors and drag-and-drop, then injects it back anywhere — eliminating manual copy-paste across sessions. The FastAPI + MongoDB backend supports versioned context storage, team sharing, semantic search, and secure access via JWT/OAuth2.',
        tech: ['Chrome Extension', 'FastAPI', 'MongoDB', 'JWT', 'OAuth2', 'Python', 'JavaScript'],
        year: '2024',
        status: 'Shipped',
        image: '/capsule-hub-viz.png',
        github: 'https://github.com/Rohit-Lahori02',
        live: 'https://capsulehub.ai/',
        impact: ['Cross-Platform Context', 'Team Collaboration', 'Zero Copy-Paste', 'Version Control'],
        challenges: [
            {
                title: 'Platform-Specific DOM Injection',
                description: 'Each AI platform (ChatGPT, Claude, Gemini, Gmail) has a different DOM structure and security policy.',
                solution: 'Built platform-specific content scripts with MutationObserver to detect and inject context at the right DOM node without breaking CSP restrictions.'
            },
            {
                title: 'Team Access Control',
                description: 'Supporting shared context across teams without leaking private conversations.',
                solution: 'Implemented team-scoped namespaces with role-based access control (RBAC) and JWT-scoped tokens so context is only visible within the authorized team boundary.'
            }
        ],
        size: 'medium',
        color: 'from-orange-500/20 to-red-500/20',
        architecture: {
            hld: `flowchart TB
    EXT["Chrome Extension\nContent Scripts + Popup"]
    API["FastAPI Backend\nJWT Middleware"]
    MDB[("MongoDB Atlas\nContext Store")]
    AUTH["OAuth2 / JWT\nAuth Service"]

    EXT -->|Capture context| API
    EXT -->|Inject context| EXT
    API --> AUTH
    AUTH -->|Token validated| API
    API --> MDB
    MDB -->|Versioned capsules| API
    API -->|Context payload| EXT`,

            lld: `flowchart LR
    subgraph Extension
        CS["ContentScript\nplatform injectors"]
        POP["Popup UI\ncapsule list\ndrag-drop"]
        BG["Background Worker\nAPI bridge"]
    end
    subgraph API
        CR["CapsuleRouter\nCRUD /capsules"]
        TR["TeamRouter\n/teams /share"]
        SR["SearchRouter\n/search semantic"]
    end
    subgraph Storage
        MDB["MongoDB\ncapsules collection"]
    end

    CS --> BG
    POP --> BG
    BG --> CR
    CR --> MDB
    TR --> MDB`,

            classDiagram: `classDiagram
    class Capsule {
        +ObjectId _id
        +String title
        +String content
        +String platform
        +String version
        +User owner
        +Team[] shared_with
        +save()
        +inject(platform)
        +share(team)
        +version_history()
    }
    class Team {
        +ObjectId _id
        +String name
        +User[] members
        +Capsule[] capsules
        +add_member(user)
        +share_capsule(capsule)
        +revoke_access(user)
    }
    class User {
        +ObjectId _id
        +String email
        +String oauth_provider
        +Team[] teams
        +Capsule[] capsules
        +create_capsule()
        +join_team()
    }
    User "1" --> "*" Capsule : owns
    Team "1" --> "*" Capsule : accesses`,

            dataFlow: `sequenceDiagram
    participant U as User (Browser)
    participant CS as Content Script
    participant BG as Background Worker
    participant API as FastAPI
    participant MDB as MongoDB

    U->>CS: Selects context on ChatGPT
    CS->>BG: capture(context, platform)
    BG->>API: POST /capsules {content, platform}
    API->>API: validate JWT + scope
    API->>MDB: INSERT capsule {owner, version}
    MDB-->>API: capsule_id
    API-->>BG: {capsule_id, success}
    U->>CS: Drag capsule into Claude
    CS->>BG: inject(capsule_id, target_platform)
    BG->>API: GET /capsules/{id}
    API->>MDB: FIND capsule
    MDB-->>API: capsule content
    API-->>BG: content payload
    BG->>CS: inject into DOM`,

            infrastructure: `flowchart TB
    subgraph Browser["Chrome Browser"]
        EXT["Extension\nContent Scripts"]
    end
    subgraph Backend["FastAPI on Docker"]
        GW["API Gateway\n:8000"]
        AUTH["JWT/OAuth2\nMiddleware"]
    end
    subgraph Atlas["MongoDB Atlas"]
        MDB[("Capsules\nCollection")]
    end

    EXT -->|HTTPS + JWT| GW
    GW --> AUTH
    AUTH --> GW
    GW --> MDB`,

            erDiagram: `erDiagram
    USER {
        objectid _id PK
        string email
        string oauth_provider
        string oauth_id
        datetime joined_at
    }
    CAPSULE {
        objectid _id PK
        string title
        text content
        string platform
        int version
        objectid owner_id FK
        datetime created_at
    }
    TEAM {
        objectid _id PK
        string name
        objectid[] member_ids FK
    }
    TEAM_CAPSULE {
        objectid team_id FK
        objectid capsule_id FK
        enum permission
    }
    USER ||--o{ CAPSULE : owns
    USER }o--o{ TEAM : belongs_to
    TEAM ||--o{ TEAM_CAPSULE : shares
    CAPSULE ||--o{ TEAM_CAPSULE : shared_via`
        }
    },
    {
        id: '03',
        title: 'Jokebox',
        category: 'Voice AI Agent',
        description: 'AI stand-up comedian with a full-duplex voice loop, live reaction scoring, and an auditable joke archive.',
        longDescription: 'Jokebox is a four-component system (voice Joker, Librarian, archive API, Viewer) that performs multi-joke sets over live audio with barge-in, scores listener reactions, and files every joke with a full decision trace. The real-time voice agent runs on self-hosted LiveKit with Deepgram STT/TTS, Silero VAD, and a local end-of-turn model, reaching a 1.6 s median listener-to-response latency with per-stage p50/p95 latency tables. A provider-agnostic LLM layer runs the whole stack on either Gemini or Claude from a single API key. The Librarian pre-writes tiered material in the background, scores reactions on a calibrated 0-10 rubric, and classifies jokes into a Box-Cabinet-Drawer-File hierarchy backed by a FastAPI + Postgres archive with OpenAPI docs, JSON/CSV export, and structural-compliance validators. Delivered in two milestones against a written brief with 96 tests under GitHub Actions CI and 38 logged architecture decisions.',
        tech: ['Python', 'FastAPI', 'PostgreSQL', 'LiveKit', 'Deepgram', 'Silero VAD', 'SQLAlchemy', 'Next.js', 'React', 'Gemini', 'Claude'],
        year: '2026',
        status: 'Shipped',
        image: '/jokebox-viz.png',
        github: 'https://github.com/Rohit-Lahori02/Jokebox',
        live: 'https://drive.google.com/file/d/1CJbUMCm-fT1j6Orc-w144jhQYyUafWY6/view?usp=sharing',
        impact: ['1.6s Median Response Latency', '50% Fewer Judge Calls', 'Gemini or Claude, One Key', '96 Tests Under CI'],
        challenges: [
            {
                title: '9-Second VAD Stall From Blocking SDK Retries',
                description: 'JSON-mode LLM calls with SDK-level retries blocked the asyncio event loop, freezing voice activity detection and barge-in for up to 9 seconds mid-set.',
                solution: 'Instrumented every turn to attribute latency per stage, then moved JSON-mode calls off the event loop behind a provider-agnostic LLM layer with per-slot model defaults and name-based routing.'
            },
            {
                title: 'Judge Traffic on Every Reaction',
                description: 'Scoring a reaction and filing the joke into the hierarchy were separate LLM calls, doubling judge traffic and adding latency between jokes.',
                solution: 'Merged scoring and filing into a single call with a calibrated 0-10 rubric, reuse-before-create hierarchy rules, and quarantine on judge failure, cutting judge traffic in half.'
            },
            {
                title: 'Tool Narration Leaking Into Speech',
                description: 'The model occasionally narrated planner or tool activity, which the TTS stage would read aloud to the listener.',
                solution: 'Added a regex guard in front of TTS and moved set structure into a deterministic planner (opener, ride, recovery, groaner, callback, closer) that records each slot rationale in provenance.'
            }
        ],
        size: 'medium',
        color: 'from-fuchsia-500/20 to-pink-500/20',
        architecture: {
            hld: `flowchart TB
    L["Listener\nBrowser Mic + Speaker"]
    LK["LiveKit SFU\nSelf-hosted WebRTC"]
    JK["Joker Voice Agent\nVAD + STT + EOT + LLM + TTS"]
    LIB["Librarian Service\nPre-writer + Judge + Filer"]
    API["Archive API\nFastAPI + SQLAlchemy async"]
    PG[("PostgreSQL\nBox / Cabinet / Drawer / File")]
    VW["Viewer\nNext.js + React"]
    LLM["LLM Provider\nGemini | Claude"]

    L <-->|Live audio| LK
    LK <-->|Audio tracks| JK
    JK -->|Joke request / reaction| LIB
    LIB -->|Tiered material / score| JK
    JK --> LLM
    LIB --> LLM
    LIB -->|File joke + trace| API
    API --> PG
    VW -->|Query hierarchy| API
    JK -->|Live transcript| VW`,

            lld: `flowchart LR
    subgraph Voice["Voice Pipeline"]
        VAD["Silero VAD\nbarge-in detect"]
        STT["Deepgram STT\nstreaming"]
        EOT["End-of-Turn\nlocal model"]
        TTS["Deepgram TTS\nnarration filter"]
    end
    subgraph Planner["Set Planner"]
        SP["SlotPlanner\nopener ride recovery\ngroaner callback closer"]
        RT["ReactionTracker\ngenre + tier adapt"]
    end
    subgraph Librarian
        PW["PreWriter\nbackground tiers"]
        JF["JudgeFiler\nrubric 0-10\nhierarchy classify"]
        QR["Quarantine\non judge failure"]
    end
    subgraph Archive
        UP["PathUpsert\nON CONFLICT"]
        VL["Validators\ncompliance state"]
        EX["Export\nJSON / CSV / stats"]
    end

    VAD --> STT
    STT --> EOT
    EOT --> SP
    RT --> SP
    SP --> TTS
    PW --> SP
    STT --> JF
    JF --> RT
    JF --> QR
    JF --> UP
    UP --> VL
    VL --> EX`,

            classDiagram: `classDiagram
    class JokerAgent {
        +LiveKitSession session
        +SetPlanner planner
        +ReactionTracker tracker
        +on_user_turn(transcript)
        +perform_slot(slot)
        +handle_barge_in()
        +filter_narration(text)
    }
    class SetPlanner {
        +Slot[] slots
        +int position
        +next_slot(reaction)
        +adapt_genre_tier()
        +record_rationale()
    }
    class Librarian {
        +LLMProvider judge
        +ArchiveClient archive
        +prewrite_tiers(genre)
        +score_and_file(joke, reaction)
        +quarantine(joke, reason)
    }
    class LLMProvider {
        +String provider
        +String api_key
        +Map slot_defaults
        +complete(prompt, slot)
        +complete_json(prompt, schema)
        +route_by_name(model)
    }
    class ArchiveClient {
        +String base_url
        +upsert_path(box, cabinet, drawer, file)
        +get_hierarchy()
        +funniest_in_genre(genre)
        +export(format)
    }
    JokerAgent --> SetPlanner : drives
    JokerAgent --> Librarian : requests material
    Librarian --> LLMProvider : judges with
    Librarian --> ArchiveClient : files to`,

            dataFlow: `sequenceDiagram
    participant L as Listener
    participant LK as LiveKit
    participant JK as Joker Agent
    participant LB as Librarian
    participant LLM as Gemini / Claude
    participant AR as Archive API
    participant VW as Viewer

    L->>LK: speaks (audio)
    LK->>JK: audio track
    JK->>JK: VAD -> STT -> end-of-turn
    JK->>LB: request material(slot, genre, tier)
    LB-->>JK: pre-written joke or generate
    JK->>LLM: generate joke (JSON mode, off loop)
    LLM-->>JK: joke text
    JK->>LK: TTS audio (narration filtered)
    LK->>L: joke playback
    L->>LK: reaction (laugh / groan / silence)
    LK->>JK: reaction transcript
    JK->>LB: score_and_file(joke, reaction)
    LB->>LLM: single judge call (score + classify)
    LLM-->>LB: score 0-10 + Box/Cabinet/Drawer/File
    LB->>AR: PUT path upsert + decision trace
    AR-->>LB: file id + compliance state
    JK->>VW: live transcript event
    VW->>AR: GET hierarchy + trace`,

            infrastructure: `flowchart TB
    subgraph Browser["Listener Browser"]
        MIC["Web Audio\nMic + Speaker"]
        VW["Viewer\nNext.js :3000"]
    end
    subgraph Docker["Docker Compose"]
        LK["LiveKit Server\nWebRTC SFU"]
        JK["Joker Worker\nlivekit-agents"]
        LB["Librarian Worker\nbackground pre-writer"]
        API["Archive API\nFastAPI :8000"]
        PG[("PostgreSQL")]
    end
    subgraph External["External APIs"]
        DG["Deepgram\nSTT + TTS"]
        GM["Google Gemini"]
        AN["Anthropic Claude"]
    end
    CI["GitHub Actions\n96 tests + real Postgres"]

    MIC <-->|WebRTC| LK
    LK <--> JK
    JK --> DG
    JK --> LB
    LB --> API
    API --> PG
    VW --> API
    JK -.->|single key| GM
    JK -.->|single key| AN
    LB -.-> GM
    LB -.-> AN
    CI -.-> API`,

            erDiagram: `erDiagram
    USER {
        uuid id PK
        string handle
        timestamp created_at
    }
    BOX {
        uuid id PK
        string name
        string genre
        boolean compliant
    }
    CABINET {
        uuid id PK
        uuid box_id FK
        string name
        boolean compliant
    }
    DRAWER {
        uuid id PK
        uuid cabinet_id FK
        string name
        boolean compliant
    }
    JOKE_FILE {
        uuid id PK
        uuid drawer_id FK
        uuid author_id FK
        text setup
        text punchline
        string tier
        float score
        string path
        boolean quarantined
        timestamp created_at
    }
    DECISION_TRACE {
        uuid id PK
        uuid joke_id FK
        string slot
        string rationale
        string judge_model
        jsonb reaction
        jsonb classification
    }
    BOX ||--o{ CABINET : contains
    CABINET ||--o{ DRAWER : contains
    DRAWER ||--o{ JOKE_FILE : contains
    USER ||--o{ JOKE_FILE : authors
    JOKE_FILE ||--|| DECISION_TRACE : explained_by`
        }
    },
    {
        id: '04',
        title: 'Muscle Memory',
        category: 'Legacy Banking UI Automation',
        description: 'An LLM discovers a workflow on a legacy banking UI once, then compiles it into a typed artifact that replays with no model in the loop.',
        longDescription: 'An end-to-end computer-use system for legacy, API-less back-office banking web apps. An LLM discovers a workflow once, then the system compiles it into a typed, versioned capability artifact that replays deterministically with no model in the loop: replay cost is zero, and a 9-step flow was recorded for under 25k tokens on a free-tier model. The artifact is an agent-callable contract with typed inputs and outputs, secret references instead of credentials, a ranked locator-strategy chain per step with recorded rationale, and a failure taxonomy that separates business outcomes, recoverable conditions, and hard failures with distinct exit codes. A text-based perception layer over the DOM infers accessible names for unlabeled controls and resolves targets geometrically, so recordings survive relabeled tenants. Human-in-the-loop handoff runs on a shared live browser session with token-based control transfer, and safety is enforced in code through origin and action allowlists, risk classification, and a redaction layer, backed by 131 automated tests including real-browser integration tests.',
        tech: ['Python', 'Playwright', 'Pydantic', 'FastAPI', 'Claude', 'OpenAI-compatible APIs', 'Chrome DevTools Protocol', 'Docker'],
        year: '2026',
        status: 'Shipped',
        image: '/bank-automation-viz.png',
        github: 'https://github.com/Rohit-Lahori02/Bank-Automation-System',
        live: 'https://drive.google.com/file/d/1L_14wW3JRIOPHYuQgJx3goDV0YXXcNbB/view?usp=sharing',
        impact: ['Zero-Cost Deterministic Replay', '9-Step Flow Under 25k Tokens', '131 Automated Tests', 'Human-in-the-Loop Handoff'],
        challenges: [
            {
                title: 'Legacy Controls With No Labels or Stable Selectors',
                description: 'The target app had unlabeled inputs, generated IDs, and tenant-specific labels, so any single locator strategy broke on the next tenant.',
                solution: 'Built a text-based perception layer that infers accessible names and resolves targets geometrically, plus a ranked locator chain per step. A relabeled tenant replayed on structural fallbacks with a drift signal, then cleanly with a six-line overlay instead of a re-recording.'
            },
            {
                title: 'Irreversible Actions Without a Human Gate',
                description: 'Steps like posting a transaction must never be executed by automation alone, but stopping the run loses browser state.',
                solution: 'Policy holds irreversible actions and transfers control via a token on the same live browser session. A human operates it through an operator console or CDP, every action is captured and redacted, and automation resumes once the expected on-screen state is verified.'
            },
            {
                title: 'Keeping Credentials and Regulated Data Out of Artifacts',
                description: 'Recordings, logs, screenshots, and Playwright traces all naturally capture whatever is on screen, including credentials and account data.',
                solution: 'Artifacts store secret references instead of values, a redaction layer scrubs logs and captures, and origin and action allowlists are checked in code before every action with block, escalate, or flag risk modes.'
            }
        ],
        size: 'large',
        color: 'from-cyan-500/20 to-teal-500/20',
        architecture: {
            hld: `flowchart TB
    CALLER["Caller\nAgent or Operator"]
    DISC["Discovery Loop\nLLM + Playwright (once)"]
    COMP["Capability Compiler\nPydantic schema"]
    ART[("Capability Artifact\ntyped, versioned JSON")]
    REPLAY["Replay Engine\nno model in the loop"]
    PERC["Perception Layer\nDOM text + geometry"]
    POL["Policy Engine\nallowlists + risk class"]
    HAND["Handoff Controller\nshared browser session"]
    RED["Redaction Layer\nlogs + captures"]
    APP["Legacy Banking App\nAPI-less web UI"]

    CALLER -->|Record workflow| DISC
    DISC --> PERC
    DISC --> COMP
    COMP --> ART
    CALLER -->|Run artifact + inputs| REPLAY
    ART --> REPLAY
    REPLAY --> PERC
    PERC <--> APP
    REPLAY --> POL
    POL -->|hold| HAND
    HAND <--> APP
    REPLAY --> RED
    HAND --> RED`,

            lld: `flowchart LR
    subgraph Perception
        DT["DOMTextLayer\nsnapshot + roles"]
        AN["NameInferer\naccessible names"]
        GR["GeoResolver\nspatial targeting"]
    end
    subgraph AgentLoop["Discovery Loop"]
        AP["ActionProtocol\nJSON actions"]
        PG["PolicyGate\npre-action check"]
        NP["NoProgressDetector"]
        CW["SlidingContext\nflat per-step cost"]
    end
    subgraph Compiler
        LC["LocatorChain\nranked strategies"]
        RA["Rationale\nper-step"]
        SV["SchemaValidator\nPydantic"]
    end
    subgraph Replay
        SR["StepRunner\ndeterministic"]
        DD["DriftDetector\nfallback signal"]
        OV["OverlayMerge\ntenant patch"]
        FT["FailureTaxonomy\nexit codes"]
    end

    DT --> AN
    AN --> GR
    GR --> AP
    AP --> PG
    PG --> NP
    NP --> CW
    CW --> LC
    LC --> RA
    RA --> SV
    SV --> SR
    SR --> DD
    DD --> OV
    SR --> FT`,

            classDiagram: `classDiagram
    class CapabilityArtifact {
        +String name
        +String version
        +Map inputs_schema
        +Map outputs_schema
        +SecretRef[] secrets
        +Step[] steps
        +validate()
        +apply_overlay(overlay)
    }
    class Step {
        +String action
        +LocatorStrategy[] locators
        +String rationale
        +String expected_state
        +boolean irreversible
        +resolve(page)
    }
    class ReplayEngine {
        +PolicyEngine policy
        +Perception perception
        +run(artifact, inputs)
        +detect_drift(step)
        +classify_failure(err)
    }
    class PolicyEngine {
        +String[] origin_allowlist
        +String[] action_allowlist
        +check(action, url)
        +classify_risk(step)
    }
    class HandoffController {
        +String token
        +BrowserSession session
        +hold(step)
        +transfer_to_operator()
        +verify_state(expected)
        +resume()
    }
    class Redactor {
        +Pattern[] rules
        +redact_log(entry)
        +redact_capture(image)
    }
    CapabilityArtifact --> Step : contains
    ReplayEngine --> CapabilityArtifact : executes
    ReplayEngine --> PolicyEngine : gated by
    ReplayEngine --> HandoffController : escalates to
    ReplayEngine --> Redactor : writes through`,

            dataFlow: `sequenceDiagram
    participant C as Caller
    participant D as Discovery Loop
    participant LLM as LLM (dev: OpenAI-compat, prod: Claude)
    participant P as Perception
    participant APP as Legacy App
    participant CM as Compiler
    participant R as Replay Engine
    participant H as Operator

    Note over C,CM: Phase 1 - discover once
    C->>D: record(goal, allowlists)
    loop each step
        D->>P: snapshot DOM as text
        P-->>D: named controls + geometry
        D->>LLM: next action? (JSON protocol)
        LLM-->>D: action
        D->>D: policy gate + no-progress check
        D->>APP: Playwright action
    end
    D->>CM: trajectory
    CM-->>C: artifact v1 (typed, versioned)

    Note over C,H: Phase 2 - replay, no model
    C->>R: run(artifact, inputs, secret refs)
    R->>P: resolve locator chain
    P->>APP: act
    APP-->>R: observed state
    alt drift detected
        R->>R: structural fallback + drift signal
    end
    alt irreversible step
        R->>H: hold + transfer token
        H->>APP: operate same session
        R->>R: verify expected state
    end
    R-->>C: outcome code + evidence (JSONL, screenshots, trace)`,

            infrastructure: `flowchart TB
    subgraph Docker["Docker Compose"]
        API["Control API\nFastAPI :8000"]
        WK["Replay Worker\nPlaywright"]
        CH["Chromium\nCDP :9222"]
        OC["Operator Console"]
        TA["Legacy App\nTenant A"]
        TB["Legacy App\nTenant B (relabeled)"]
    end
    subgraph LLM["LLM Providers"]
        OAI["OpenAI-compatible\nfree tier (dev)"]
        ANT["Anthropic Claude\n(prod)"]
    end
    subgraph Evidence["Evidence Store"]
        EV["17 replay scenarios\nJSONL + screenshots + traces"]
    end
    CI["CI\n131 tests incl. real browser"]

    API --> WK
    WK --> CH
    CH --> TA
    CH --> TB
    OC -->|token handoff| CH
    WK -.->|discovery only| OAI
    WK -.->|discovery only| ANT
    WK --> EV
    CI -.-> WK`,

            erDiagram: `erDiagram
    ARTIFACT {
        uuid id PK
        string name
        string version
        jsonb inputs_schema
        jsonb outputs_schema
        string origin_allowlist
        timestamp recorded_at
    }
    STEP {
        uuid id PK
        uuid artifact_id FK
        int ordinal
        string action
        string rationale
        string expected_state
        boolean irreversible
        enum risk_class
    }
    LOCATOR_STRATEGY {
        uuid id PK
        uuid step_id FK
        int rank
        string kind
        string value
    }
    SECRET_REF {
        uuid id PK
        uuid artifact_id FK
        string ref_name
        string vault_key
    }
    RUN {
        uuid id PK
        uuid artifact_id FK
        string tenant
        enum outcome
        int exit_code
        boolean drift
        timestamp started_at
    }
    RUN_EVENT {
        uuid id PK
        uuid run_id FK
        uuid step_id FK
        string observed_state
        string screenshot_path
        boolean redacted
    }
    HANDOFF {
        uuid id PK
        uuid run_id FK
        uuid step_id FK
        string token
        string operator
        boolean verified
    }
    ARTIFACT ||--o{ STEP : defines
    STEP ||--o{ LOCATOR_STRATEGY : resolves_via
    ARTIFACT ||--o{ SECRET_REF : references
    ARTIFACT ||--o{ RUN : executed_as
    RUN ||--o{ RUN_EVENT : logs
    RUN ||--o{ HANDOFF : escalates`
        }
    },
    {
        id: '05',
        title: 'Plant Disease Detector',
        category: 'ML / Computer Vision',
        description: 'CNN model classifying 38 plant disease categories at 94% accuracy, deployed on AWS EC2 with Streamlit.',
        longDescription: 'A real-time plant disease detection system built with TensorFlow and Keras. The CNN model classifies images across 38 distinct disease categories using Conv2D and MaxPooling layers, trained with data augmentation for robustness. Deployed on an AWS EC2 Ubuntu instance with a Streamlit frontend for live image uploads and classification results.',
        tech: ['TensorFlow', 'Keras', 'Python', 'AWS EC2', 'Streamlit', 'OpenCV'],
        year: '2024',
        status: 'Live',
        image: '/plant-disease-viz.png',
        github: 'https://github.com/Rohit-Lahori02',
        live: null,
        impact: ['94% Accuracy', '38 Disease Categories', 'Real-Time Classification', 'AWS Deployed'],
        challenges: [
            {
                title: 'Class Imbalance Across 38 Categories',
                description: 'Some disease categories had significantly fewer samples, causing the model to underfit rare diseases.',
                solution: 'Applied aggressive data augmentation (rotation, flipping, color jitter, zoom) and class-weighted loss to equalize training signal across all 38 categories.'
            },
            {
                title: 'Deployment Latency on EC2',
                description: 'Model inference on CPU EC2 was too slow for a real-time user experience.',
                solution: 'Optimized the Keras model with TensorFlow SavedModel format and batched inference. Streamlit caching further reduced repeat prediction overhead.'
            }
        ],
        size: 'small',
        color: 'from-green-500/20 to-emerald-500/20',
        architecture: {
            hld: `flowchart TB
    UI["Streamlit Frontend\nImage Upload + Results"]
    INF["Inference Engine\nTF SavedModel"]
    PRE["Preprocessor\nOpenCV + Augmentation"]
    MODEL["CNN Model\nConv2D + MaxPooling"]
    AWS["AWS EC2 Ubuntu\nDocker Container"]

    UI -->|Image Upload| PRE
    PRE -->|Normalized Tensor| MODEL
    MODEL -->|Class Probabilities| INF
    INF -->|Top-1 Prediction| UI
    AWS --> UI
    AWS --> INF`,

            lld: `flowchart LR
    subgraph Preprocessing
        LD["ImageLoader\nresize 224x224"]
        AUG["Augmentor\nflip rotate zoom"]
        NORM["Normalizer\npixel/255"]
    end
    subgraph Model
        C1["Conv2D Block 1\n32 filters ReLU"]
        C2["Conv2D Block 2\n64 filters ReLU"]
        FC["Dense Layers\nSoftmax 38"]
    end

    LD --> AUG
    AUG --> NORM
    NORM --> C1
    C1 --> C2
    C2 --> FC`,

            classDiagram: `classDiagram
    class CNNModel {
        +Sequential model
        +int num_classes
        +build()
        +train(dataset)
        +predict(image)
        +evaluate(test_set)
        +save(path)
    }
    class ImagePreprocessor {
        +int target_size
        +float scale
        +preprocess(image)
        +augment(image)
        +normalize(tensor)
    }
    class DiseaseClassifier {
        +CNNModel model
        +String[] class_labels
        +ImagePreprocessor preprocessor
        +classify(image_path)
        +get_top_k(k)
        +get_confidence()
    }
    DiseaseClassifier --> CNNModel : wraps
    DiseaseClassifier --> ImagePreprocessor : uses`,

            dataFlow: `sequenceDiagram
    participant U as User
    participant ST as Streamlit UI
    participant PP as Preprocessor
    participant MDL as CNN Model
    participant AWS as EC2 Instance

    U->>ST: Upload plant image
    ST->>PP: raw image bytes
    PP->>PP: resize(224,224) normalize()
    PP->>MDL: input tensor [1,224,224,3]
    MDL->>MDL: forward pass Conv2D layers
    MDL-->>ST: softmax probs [38]
    ST->>ST: argmax -> class label + confidence
    ST-->>U: Disease name + confidence score
    AWS->>AWS: Streamlit cache repeat predictions`,

            infrastructure: `flowchart TB
    subgraph AWS["AWS EC2 Ubuntu"]
        STR["Streamlit App\n:8501"]
        MDL["TF SavedModel\nLoaded in memory"]
    end
    User["Browser\nUser Upload"] -->|HTTPS| STR
    STR --> MDL
    MDL -->|Prediction| STR`,

            erDiagram: `erDiagram
    PREDICTION_LOG {
        uuid id PK
        string filename
        string predicted_class
        float confidence
        int inference_ms
        timestamp created_at
    }
    CLASS_REGISTRY {
        int class_id PK
        string disease_name
        string plant_type
        string severity
    }
    PREDICTION_LOG }o--|| CLASS_REGISTRY : maps_to`
        }
    },
];

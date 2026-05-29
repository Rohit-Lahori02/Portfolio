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
        image: '/guidera-mockup.png',
        github: 'https://github.com/Rohit-Lahori02',
        live: null,
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
        image: '/capsule-hub-mockup.png',
        github: 'https://github.com/Rohit-Lahori02',
        live: null,
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
        title: 'Plant Disease Detector',
        category: 'ML / Computer Vision',
        description: 'CNN model classifying 38 plant disease categories at 94% accuracy, deployed on AWS EC2 with Streamlit.',
        longDescription: 'A real-time plant disease detection system built with TensorFlow and Keras. The CNN model classifies images across 38 distinct disease categories using Conv2D and MaxPooling layers, trained with data augmentation for robustness. Deployed on an AWS EC2 Ubuntu instance with a Streamlit frontend for live image uploads and classification results.',
        tech: ['TensorFlow', 'Keras', 'Python', 'AWS EC2', 'Streamlit', 'OpenCV'],
        year: '2024',
        status: 'Live',
        image: '/plant-disease-mockup.png',
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

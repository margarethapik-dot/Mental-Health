import { PersonalityArchetype, QuizQuestion, AnxietyQuestion, CopingResource } from '../types';

export const SECONDARY_ARCHETYPES: PersonalityArchetype[] = [
  {
    id: 'analytical',
    name: 'Analytical Strategist',
    title: 'The Systems Thinker',
    emoji: '🧠',
    tagline: 'Logical, objective, and driven by understanding core mechanics',
    description: 'You thrive when you can break complex problems into orderly steps. You appreciate data, clarity, and rational analysis, but you can be prone to analysis paralysis.',
    strengths: ['Critical reasoning', 'Objective decision making', 'Pattern recognition', 'High standards for quality'],
    stressSigns: ['Overthinking worst-case outcomes', 'Paralysis by analysis', 'Frustration when instructions are vague'],
    rechargeMethod: 'Solo deep-dive into an intriguing topic, gaming with clear mechanics, or quiet time without social expectations.',
    recommendedTools: ['box-breathing', 'cbt-reframer', 'circle-control'],
    quote: 'Clarity emerges when we organize our thoughts with patience.',
    accentColor: '#0284c7'
  },
  {
    id: 'empathic',
    name: 'Empathic Connector',
    title: 'The Relational Bridge',
    emoji: '🤝',
    tagline: 'Intuitive, loyal, and naturally attuned to emotional atmospheres',
    description: 'You care deeply about the people in your circle. You notice subtle shifts in people\'s moods and value genuine connection over superficial popularity.',
    strengths: ['High emotional intelligence', 'Empathetic listening', 'Team harmony builder', 'Loyal advocacy'],
    stressSigns: ['Absorbing others\' stress like a sponge', 'Difficulty setting boundaries', 'Fearing that friends are secretly upset'],
    rechargeMethod: 'A genuine 1-on-1 talk with a trusted confidant, journaling emotions, or creating cozy ambient spaces.',
    recommendedTools: ['4-7-8-breathing', 'safe-communication', 'safari-grounding'],
    quote: 'Empathy is a strength, but healthy boundaries protect my peace.',
    accentColor: '#0d9488'
  },
  {
    id: 'creative',
    name: 'Creative Visionary',
    title: 'The Conceptual Innovator',
    emoji: '🎨',
    tagline: 'Imaginative, unconventional, and fueled by big conceptual leaps',
    description: 'You look at the world from unexpected angles. You dislike rigid boxes and rote memorization, thriving when you have creative liberty to produce original work.',
    strengths: ['Original perspective', 'Creative synthesis', 'Adaptive problem solving', 'Passionate storytelling'],
    stressSigns: ['Imposter syndrome when comparing craft', 'Feeling overwhelmed by routine logistics', 'Creative burnout'],
    rechargeMethod: 'Freeform sketching, playing or discovering ambient music, walking outside with no phone notifications.',
    recommendedTools: ['cbt-reframer', 'circle-control', 'ambient-focus'],
    quote: 'Originality requires giving myself permission to make messy drafts.',
    accentColor: '#7c3aed'
  },
  {
    id: 'grounded',
    name: 'Grounded Anchor',
    title: 'The Steadfast Realist',
    emoji: '⚓',
    tagline: 'Practical, dependable, and calm under routine pressures',
    description: 'You are the calm presence in a room full of chaos. You value consistency, fairness, and realistic expectations. You quietly deliver results without needing drama.',
    strengths: ['Emotional steadiness', 'Reliable execution', 'Pragmatic perspective', 'Crisis calm'],
    stressSigns: ['Internalizing stress silently until somatic symptoms appear (headaches, tight jaw)', 'Resisting sudden pivots'],
    rechargeMethod: 'Physical exercise, spending time outdoors in nature, tactile hobbies (cooking, woodworking, gym).',
    recommendedTools: ['box-breathing', 'somatic-scan', 'circle-control'],
    quote: 'Consistency and quiet resilience weather any passing storm.',
    accentColor: '#059669'
  },
  {
    id: 'dynamic',
    name: 'Dynamic Driver',
    title: 'The Catalytic Leader',
    emoji: '⚡',
    tagline: 'Ambitious, energetic, and motivated by tangible progress',
    description: 'You have high drive and like to see momentum. You set big targets for your academics, sports, or projects, but high expectations can sometimes fuel intense anxiety.',
    strengths: ['Goal orientation', 'Decisiveness', 'Infectious momentum', 'Resilience under challenge'],
    stressSigns: ['Perfectionist panic when a score drops', 'Irritability during delays', 'Difficulty switching off thoughts at night'],
    rechargeMethod: 'High-intensity athletic workout followed by progressive muscle relaxation, or structured downtime.',
    recommendedTools: ['box-breathing', 'circle-control', 'cbt-reframer'],
    quote: 'My self-worth is not determined solely by my test scores or output.',
    accentColor: '#d97706'
  },
  {
    id: 'reflective',
    name: 'Reflective Seeker',
    title: 'The Authentic Observer',
    emoji: '🧭',
    tagline: 'Introspective, thoughtful, and seeking deeper meaning and truth',
    description: 'You spend time examining your internal landscape and the ethical dimensions of life. You resist fake trends and prefer working autonomously in pursuit of real understanding.',
    strengths: ['Self-awareness', 'Integrity', 'Independent philosophy', 'Thoughtful reflection'],
    stressSigns: ['Existential dread or future anxiety', 'Feeling alienated or misunderstood in crowds', 'Rumination spirals'],
    rechargeMethod: 'Long solo walks, reading philosophy or long-form essays, meditative reflection in natural light.',
    recommendedTools: ['4-7-8-breathing', 'cbt-reframer', 'safari-grounding'],
    quote: 'Deep roots allow the tree to bend in strong winds without breaking.',
    accentColor: '#4f46e5'
  }
];

export const SECONDARY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'When faced with a massive group project or competition, what role feels most natural?',
    options: [
      { text: 'Mapping out the timeline, technical details, and troubleshooting logic', emoji: '📊', archetypeId: 'analytical' },
      { text: 'Checking in on everyone, facilitating communication, and keeping morale high', emoji: '💬', archetypeId: 'empathic' },
      { text: 'Brainstorming the wild conceptual angle that differentiates our proposal', emoji: '💡', archetypeId: 'creative' },
      { text: 'Executing the essential core deliverables with steady, reliable precision', emoji: '🛠️', archetypeId: 'grounded' },
      { text: 'Driving the momentum, making swift decisions, and pitching the presentation', emoji: '🚀', archetypeId: 'dynamic' },
      { text: 'Reviewing the deeper significance, ethics, and long-term validity of our work', emoji: '🔍', archetypeId: 'reflective' }
    ]
  },
  {
    id: 2,
    question: 'How do you typically recharge after a mentally exhausting school day?',
    options: [
      { text: 'Diving into an analytical personal hobby, coding, gaming, or reading data', emoji: '🎮', archetypeId: 'analytical' },
      { text: 'Unfiltered 1-on-1 debrief with my closest friend or trusted sibling', emoji: '☕', archetypeId: 'empathic' },
      { text: 'Putting on headphones and letting my mind wander while making art or music', emoji: '🎧', archetypeId: 'creative' },
      { text: 'Going for a jog, gym session, or physical routine to disconnect from screens', emoji: '🏃', archetypeId: 'grounded' },
      { text: 'Channeling energy into a personal passion project where I have full agency', emoji: '🎯', archetypeId: 'dynamic' },
      { text: 'Journaling, meditating, or taking a quiet walk alone without interruption', emoji: '🌲', archetypeId: 'reflective' }
    ]
  },
  {
    id: 3,
    question: 'What is your primary subconscious reaction when a sudden change disrupts your schedule?',
    options: [
      { text: 'I immediately recalculate the logistics to see what variables need adjusting', emoji: '🧮', archetypeId: 'analytical' },
      { text: 'I worry about how the disruption affects the people around me and their stress', emoji: '🥺', archetypeId: 'empathic' },
      { text: 'I see it as a chance to pivot into an unconventional alternative path', emoji: '🌀', archetypeId: 'creative' },
      { text: 'I take a step back, stay anchored, and wait for the dust to settle before moving', emoji: '⚓', archetypeId: 'grounded' },
      { text: 'I get slightly impatient and push aggressively to regain control of the outcome', emoji: '⚡', archetypeId: 'dynamic' },
      { text: 'I ponder the underlying root causes and wonder why the disruption happened', emoji: '💭', archetypeId: 'reflective' }
    ]
  },
  {
    id: 4,
    question: 'Which of these academic or social situations tends to trigger your stress fastest?',
    options: [
      { text: 'Vague assignment rubrics where grading criteria are subjective or unclear', emoji: '❓', archetypeId: 'analytical' },
      { text: 'Underlying tension, rumors, or unspoken conflict within my friend circle', emoji: '👥', archetypeId: 'empathic' },
      { text: 'Being forced into repetitive, rigid tasks that leave zero room for individual thought', emoji: '📦', archetypeId: 'creative' },
      { text: 'Chaos, erratic last-minute changes, or sensory overload without breaks', emoji: '🌪️', archetypeId: 'grounded' },
      { text: 'Feeling like I am underperforming or falling behind my peers in achievement', emoji: '📉', archetypeId: 'dynamic' },
      { text: 'Superficial peer pressures that feel inauthentic to my core values', emoji: '🎭', archetypeId: 'reflective' }
    ]
  },
  {
    id: 5,
    question: 'When receiving feedback on your work, what matters most to you?',
    options: [
      { text: 'Specific, evidence-based recommendations that pinpoint exact logical flaws', emoji: '📝', archetypeId: 'analytical' },
      { text: 'Tone of delivery—respectful, encouraging words that preserve human trust', emoji: '🤝', archetypeId: 'empathic' },
      { text: 'Whether they grasped the creative spirit and originality behind the concept', emoji: '🎨', archetypeId: 'creative' },
      { text: 'Practical, actionable steps that can be realistically implemented without fluff', emoji: '📐', archetypeId: 'grounded' },
      { text: 'How implementing the feedback will elevate my final competitive standing', emoji: '🏆', archetypeId: 'dynamic' },
      { text: 'Whether the feedback challenges me to think more deeply and grow philosophically', emoji: '💡', archetypeId: 'reflective' }
    ]
  },
  {
    id: 6,
    question: 'What kind of work environment allows you to produce your best results?',
    options: [
      { text: 'A clean desk with multi-screens, noise-canceling headphones, and clear goals', emoji: '💻', archetypeId: 'analytical' },
      { text: 'A collaborative, warm atmosphere where colleagues encourage each other', emoji: '🌱', archetypeId: 'empathic' },
      { text: 'An open studio setting with whiteboards, colors, and inspirational references', emoji: '🖌️', archetypeId: 'creative' },
      { text: 'A predictable, quiet space with structured hours and practical tools', emoji: '🕰️', archetypeId: 'grounded' },
      { text: 'A fast-paced arena with milestones, healthy competition, and clear reward', emoji: '⚡', archetypeId: 'dynamic' },
      { text: 'An independent retreat space near nature where I can think without surveillance', emoji: '🍃', archetypeId: 'reflective' }
    ]
  },
  {
    id: 7,
    question: 'When your inner critic starts speaking during a difficult week, what does it usually say?',
    options: [
      { text: '"You missed a crucial variable; your solution wasn\'t smart enough."', emoji: '⚠️', archetypeId: 'analytical' },
      { text: '"You let someone down or made them disappointed in you."', emoji: '💔', archetypeId: 'empathic' },
      { text: '"Your work isn\'t truly original; you\'re just faking it."', emoji: '🎭', archetypeId: 'creative' },
      { text: '"You can\'t handle this sudden chaos; you\'re losing your balance."', emoji: '🌊', archetypeId: 'grounded' },
      { text: '"You\'re not moving fast enough; others are outpacing you."', emoji: '⏳', archetypeId: 'dynamic' },
      { text: '"Why does any of this matter? Are you even on the right path?"', emoji: '🌌', archetypeId: 'reflective' }
    ]
  },
  {
    id: 8,
    question: 'If you could choose your ultimate superpower for your student years, which would it be?',
    options: [
      { text: 'Instant analytical clarity: Seeing the mathematical solution to any dilemma', emoji: '🔮', archetypeId: 'analytical' },
      { text: 'Emotional resonance: Healing conflicts and making anyone feel truly valued', emoji: '💖', archetypeId: 'empathic' },
      { text: 'Uncapped creativity: Manifesting groundbreaking concepts out of thin air', emoji: '✨', archetypeId: 'creative' },
      { text: 'Unshakable calm: Remaining steady and clear-headed in any emergency', emoji: '🛡️', archetypeId: 'grounded' },
      { text: 'Limitless momentum: Transforming any aspiration into high-impact reality', emoji: '⚡', archetypeId: 'dynamic' },
      { text: 'Profound wisdom: Piercing through illusions to find genuine truth', emoji: '👁️', archetypeId: 'reflective' }
    ]
  }
];

export const SECONDARY_ANXIETY_QUESTIONS: AnxietyQuestion[] = [
  {
    id: 1,
    question: 'Feeling nervous, anxious, or on edge over the past 2 weeks',
    subtext: 'A constant undercurrent of dread or jittery tension.',
    category: 'physical'
  },
  {
    id: 2,
    question: 'Not being able to stop or control persistent worrying / repetitive overthinking',
    subtext: 'Your brain looping on worst-case scenarios or ruminating over mistakes.',
    category: 'thoughts'
  },
  {
    id: 3,
    question: 'Worrying excessively about different school or social events',
    subtext: 'Exam performance, college prep, what peers think, or upcoming obligations.',
    category: 'future'
  },
  {
    id: 4,
    question: 'Trouble relaxing or physical tension (tight jaw, neck stiffness, shallow breath)',
    subtext: 'Feeling physically wound up like a coiled spring even when resting.',
    category: 'physical'
  },
  {
    id: 5,
    question: 'Being so restless that it is hard to sit still or concentrate on study',
    subtext: 'Frequent pacing, tab-switching, brain fog, or inability to focus.',
    category: 'school'
  },
  {
    id: 6,
    question: 'Becoming easily annoyed, impatient, or irritable with people around you',
    subtext: 'Snapping at family or friends when feeling secretly overwhelmed.',
    category: 'social'
  },
  {
    id: 7,
    question: 'Feeling afraid as if something awful might happen, or imposter syndrome',
    subtext: 'A sudden sinking gut feeling or fear that you\'re about to be exposed as inadequate.',
    category: 'thoughts'
  }
];

export const SECONDARY_TRIGGERS = [
  { id: 'exams', label: 'High-Stakes Exams & Grading', emoji: '📑' },
  { id: 'deadlines', label: 'Stacked Deadlines & Homework Load', emoji: '⏰' },
  { id: 'peer', label: 'Social Acceptance, Rumors & FOMO', emoji: '👥' },
  { id: 'perfectionism', label: 'Perfectionism & Fear of Failure', emoji: '🎯' },
  { id: 'parents', label: 'Family & Parental Expectations', emoji: '🏡' },
  { id: 'future', label: 'College Applications & Future Career', emoji: '🧭' },
  { id: 'sleep', label: 'Sleep Deprivation & Chronic Fatigue', emoji: '🌙' },
  { id: 'speaking', label: 'Presentations & Speaking in Public', emoji: '🎙️' }
];

export const SECONDARY_COPING_TOOLS: CopingResource[] = [
  {
    id: 'box-breathing',
    title: 'Box Breathing (Tactical 4-4-4-4)',
    category: 'breathing',
    duration: '3 minutes',
    description: 'Used by high performers and emergency responders to stabilize autonomic nervous system: 4s Inhale, 4s Hold, 4s Exhale, 4s Hold.',
    tags: ['Vagal Reset', 'Pre-Exam Calm', 'Rapid Focus'],
    suitableFor: ['secondary']
  },
  {
    id: '4-7-8-breathing',
    title: '4-7-8 Parasympathetic Reset',
    category: 'breathing',
    duration: '4 minutes',
    description: 'Extended exhalation stimulates the parasympathetic nervous system, slowing heart rate and preparing body for restorative rest.',
    tags: ['Bedtime Anxiety', 'Panic Relief', 'Deep Rest'],
    suitableFor: ['secondary']
  },
  {
    id: 'cbt-reframer',
    title: 'CBT Cognitive Reframer',
    category: 'reframing',
    duration: '4 minutes',
    description: 'Catch automatic catastrophic thoughts, identify common cognitive distortions (Catastrophizing, Mind Reading, All-or-Nothing), and formulate a grounded, evidence-based alternative.',
    tags: ['Mental Resilience', 'Overcoming Spiral', 'CBT Tool'],
    suitableFor: ['secondary']
  },
  {
    id: 'circle-control',
    title: 'Circle of Control & Influence',
    category: 'reframing',
    duration: '3 minutes',
    description: 'Separate what is within your control (effort, preparation, attitude) from what is outside your control (others\' reactions, final exam difficulty, past mistakes).',
    tags: ['Perspective Shift', 'Boundary Setting', 'Stress Relief'],
    suitableFor: ['secondary', 'primary']
  },
  {
    id: 'safari-grounding',
    title: '5-4-3-2-1 Somatosensory Anchoring',
    category: 'grounding',
    duration: '3 minutes',
    description: 'Interrupt an adrenaline flood by engaging external sensory channels: 5 visual details, 4 physical textures, 3 subtle auditory frequencies, 2 aromas, 1 physical anchor.',
    tags: ['De-escalation', 'Sensory Grounding', 'Disaster Reset'],
    suitableFor: ['primary', 'secondary']
  },
  {
    id: 'somatic-scan',
    title: 'Progressive Somatic Tension Release',
    category: 'somatic',
    duration: '5 minutes',
    description: 'Systematically tense and consciously release muscle groups from jaw to shoulders to hands, dislodging trapped physical tension.',
    tags: ['Body Tension', 'Jaw Clenching', 'Headache Relief'],
    suitableFor: ['secondary']
  },
  {
    id: 'safe-communication',
    title: 'Counselor & Teacher Bridge Scripts',
    category: 'action',
    duration: 'Instant',
    description: 'Proven professional scripts for requesting assignment extensions, discreetly asking for a mental health break, or scheduling time with your school counselor.',
    tags: ['Assertive Voice', 'Self-Advocacy', 'School Support'],
    suitableFor: ['secondary']
  }
];

export const COGNITIVE_DISTORTIONS = [
  {
    id: 'catastrophizing',
    name: 'Catastrophizing',
    definition: 'Assuming the absolute worst-case scenario will inevitably happen.',
    example: '"If I stumble on slide 2, my entire grade is ruined and everyone will laugh at me."',
    reframe: '"A temporary slip-up is normal. People pay attention to the overall message, not minor pauses."'
  },
  {
    id: 'all-or-nothing',
    name: 'All-or-Nothing Thinking',
    definition: 'Viewing situations in black-or-white absolutes with no middle ground.',
    example: '"If I don\'t get an A on this paper, I am a total failure."',
    reframe: '"One assignment score does not define my intelligence or future. Learning is an ongoing continuum."'
  },
  {
    id: 'mind-reading',
    name: 'Mind Reading',
    definition: 'Assuming you know that others are thinking negatively about you without evidence.',
    example: '"They looked at their phone when I spoke; they must find me boring."',
    reframe: '"People have their own distractions and fatigue. I cannot assume their thoughts without direct feedback."'
  },
  {
    id: 'emotional-reasoning',
    name: 'Emotional Reasoning',
    definition: 'Believing that because you feel anxious, danger or failure is guaranteed.',
    example: '"I feel so terrified right now, which means I am going to fail."',
    reframe: '"Anxiety is a nervous system alarm, not a crystal ball. Feeling anxious doesn\'t mean disaster is real."'
  }
];

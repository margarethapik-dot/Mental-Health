import { PersonalityArchetype, QuizQuestion, AnxietyQuestion, CopingResource } from '../types';

export const PRIMARY_ARCHETYPES: PersonalityArchetype[] = [
  {
    id: 'owl',
    name: 'Wise Owl',
    title: 'The Thoughtful Thinker',
    emoji: '🦉',
    tagline: 'Deep thinker who loves understanding how things work',
    description: 'You love reading, puzzles, and taking time to observe. You notice small details others miss and think carefully before you speak.',
    strengths: ['Curious researcher', 'Patient problem solver', 'Great memory', 'Thoughtful observer'],
    stressSigns: ['Overthinking little mistakes', 'Getting stuck on a problem', 'Feeling rushed or overwhelmed by noise'],
    rechargeMethod: 'Quiet reading nook, building Legos alone, or soft drawing time.',
    recommendedTools: ['belly-breathing', 'cloud-worry', 'safari-grounding'],
    quote: 'Knowledge is my quiet superpower.',
    accentColor: '#0284c7' // sky-600
  },
  {
    id: 'lion',
    name: 'Brave Lion',
    title: 'The Bold Leader',
    emoji: '🦁',
    tagline: 'Energetic and ready to try exciting new adventures',
    description: 'You have plenty of enthusiasm! You love active games, speaking your mind, and standing up for your friends when someone needs help.',
    strengths: ['Natural bravery', 'Big energy', 'Stands up for friends', 'Loves trying new games'],
    stressSigns: ['Fidgeting or feeling restless', 'Feeling impatient or angry quickly', 'Bottling up worry until it explodes'],
    rechargeMethod: 'Running outside, high-energy dancing, or squeezing a stress ball.',
    recommendedTools: ['wiggle-shake', 'starfish-breathing', 'circle-control'],
    quote: 'Courage is doing my best even when my heart beats fast.',
    accentColor: '#d97706' // amber-600
  },
  {
    id: 'dolphin',
    name: 'Gentle Dolphin',
    title: 'The Empathetic Friend',
    emoji: '🐬',
    tagline: 'Caring heart who makes sure everyone feels included',
    description: 'You are warm and kind. If someone looks sad at recess, you notice first. You make friends feel heard and safe.',
    strengths: ['Kind teammate', 'Wonderful listener', 'Shares willingly', 'Peacemaker'],
    stressSigns: ['Worrying too much about others', 'Feeling scared of conflict', 'Hesitating to say "no"'],
    rechargeMethod: 'Cuddling a pet, talking with a best buddy, or writing kind notes.',
    recommendedTools: ['belly-breathing', 'safe-person', 'safari-grounding'],
    quote: 'Kindness makes the whole world brighter.',
    accentColor: '#0d9488' // teal-600
  },
  {
    id: 'chameleon',
    name: 'Creative Chameleon',
    title: 'The Imaginative Artist',
    emoji: '🦎',
    tagline: 'Vibrant imagination that turns ideas into colorful worlds',
    description: 'You see things in unique, magical ways! You love making crafts, writing funny stories, drawing, and coming up with clever surprises.',
    strengths: ['Boundless imagination', 'Open-minded', 'Creative storytelling', 'Color & music lover'],
    stressSigns: ['Worrying that your art isn\'t "perfect"', 'Getting overwhelmed by strict rules', 'Daydreaming when nervous'],
    rechargeMethod: 'Doodling freely with no rules, listening to instrumental tunes, making paper planes.',
    recommendedTools: ['cloud-worry', 'safari-grounding', 'belly-breathing'],
    quote: 'Mistakes are just happy little surprises.',
    accentColor: '#7c3aed' // violet-600
  },
  {
    id: 'turtle',
    name: 'Steady Turtle',
    title: 'The Calm Grounder',
    emoji: '🐢',
    tagline: 'Peaceful, trustworthy, and loves taking things one step at a time',
    description: 'You are gentle, reliable, and bring a feeling of calm wherever you go. You don\'t like being rushed, and you do neat, careful work.',
    strengths: ['Very trustworthy', 'Keeps promises', 'Calm presence', 'Finishes what you start'],
    stressSigns: ['Shutting down when things change suddenly', 'Feeling frozen when rushed', 'Hiding worries inside your shell'],
    rechargeMethod: 'Cozy blanket time, sipping warm water or cocoa, listening to rain sounds.',
    recommendedTools: ['starfish-breathing', 'safari-grounding', 'circle-control'],
    quote: 'Slow and steady grows strong and happy.',
    accentColor: '#16a34a' // green-600
  },
  {
    id: 'squirrel',
    name: 'Curious Squirrel',
    title: 'The Quick Explorer',
    emoji: '🐿️',
    tagline: 'Quick thinker with a hundred fun questions every day',
    description: 'Your brain moves at lightning speed! You want to know "Why?", "How?", and "What happens next?" You bounce from idea to idea with joy.',
    strengths: ['Fast learner', 'Joyful curiosity', 'Finds fun in everything', 'Adaptable'],
    stressSigns: ['Mind spinning like a pinwheel', 'Difficulty settling down for sleep', 'Tummy butterflies'],
    rechargeMethod: 'Scavenger hunt in the yard, sorting colorful objects, breathing with rhythm.',
    recommendedTools: ['safari-grounding', 'belly-breathing', 'wiggle-shake'],
    quote: 'Every day has a new mystery waiting to be found.',
    accentColor: '#ea580c' // orange-600
  }
];

export const PRIMARY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'During recess or free play time, what sounds most fun to you?',
    subtext: 'Pick the one that feels most like you!',
    options: [
      { text: 'Reading a cool book or solving a puzzle in a quiet spot', emoji: '📚', archetypeId: 'owl' },
      { text: 'Running around playing tag or kicking a ball with friends', emoji: '⚽', archetypeId: 'lion' },
      { text: 'Sitting together sharing snacks and chatting with a friend', emoji: '💬', archetypeId: 'dolphin' },
      { text: 'Drawing a comic, building with blocks, or making crafts', emoji: '🎨', archetypeId: 'chameleon' },
      { text: 'Walking quietly, collecting neat leaves, or observing nature', emoji: '🍃', archetypeId: 'turtle' },
      { text: 'Exploring new corners of the playground to see what you find', emoji: '🔍', archetypeId: 'squirrel' }
    ]
  },
  {
    id: 2,
    question: 'When your class has a team project, what is your favorite part?',
    options: [
      { text: 'Looking up interesting facts and checking the instructions', emoji: '🦉', archetypeId: 'owl' },
      { text: 'Getting the group excited and presenting in front of class', emoji: '🦁', archetypeId: 'lion' },
      { text: 'Making sure everyone has a turn and feels happy', emoji: '🐬', archetypeId: 'dolphin' },
      { text: 'Designing the poster, drawings, and cool decorations', emoji: '🦎', archetypeId: 'chameleon' },
      { text: 'Keeping our supplies neat and working steadily step-by-step', emoji: '🐢', archetypeId: 'turtle' },
      { text: 'Coming up with lots of wild, funny brainstorm ideas', emoji: '🐿️', archetypeId: 'squirrel' }
    ]
  },
  {
    id: 3,
    question: 'If you have a difficult homework question, what do you usually do?',
    options: [
      { text: 'Read the question three times and think carefully on my own', emoji: '🤔', archetypeId: 'owl' },
      { text: 'Jump in and try answering right away to see if I get it', emoji: '⚡', archetypeId: 'lion' },
      { text: 'Ask a friend or teacher gently so we can solve it together', emoji: '🤝', archetypeId: 'dolphin' },
      { text: 'Draw a picture or diagram to imagine the problem differently', emoji: '✏️', archetypeId: 'chameleon' },
      { text: 'Take a deep breath and go slowly through the steps one by one', emoji: '⏳', archetypeId: 'turtle' },
      { text: 'Look around for clues or try three different ideas in a flash', emoji: '💡', archetypeId: 'squirrel' }
    ]
  },
  {
    id: 4,
    question: 'What kind of compliment makes your heart feel happiest?',
    options: [
      { text: '"You are so smart and thoughtful!"', emoji: '🌟', archetypeId: 'owl' },
      { text: '"You are super brave and strong!"', emoji: '💪', archetypeId: 'lion' },
      { text: '"You are such a caring, kind friend!"', emoji: '💖', archetypeId: 'dolphin' },
      { text: '"Your idea is so creative and original!"', emoji: '✨', archetypeId: 'chameleon' },
      { text: '"I can always count on you, you are so reliable!"', emoji: '🛡️', archetypeId: 'turtle' },
      { text: '"You make everything so exciting and fun!"', emoji: '🚀', archetypeId: 'squirrel' }
    ]
  },
  {
    id: 5,
    question: 'When you feel a little upset or tired, what helps you feel better?',
    options: [
      { text: 'Sitting in my room with a book or my favorite gadget in peace', emoji: '📖', archetypeId: 'owl' },
      { text: 'Running, jumping on a trampoline, or doing sports', emoji: '🏃', archetypeId: 'lion' },
      { text: 'Getting a warm hug from family or hugging my soft toy', emoji: '🧸', archetypeId: 'dolphin' },
      { text: 'Coloring, listening to songs, or playing pretend games', emoji: '🎧', archetypeId: 'chameleon' },
      { text: 'Wrapping myself in a cozy blanket and resting quietly', emoji: '🛌', archetypeId: 'turtle' },
      { text: 'Playing with a fidget toy or finding something new to play with', emoji: '🎯', archetypeId: 'squirrel' }
    ]
  },
  {
    id: 6,
    question: 'If you were an animal explorer in a magical forest, what would you bring?',
    options: [
      { text: 'A magnifying glass and a field guide to identify trees', emoji: '🔬', archetypeId: 'owl' },
      { text: 'A sturdy walking stick and a brave banner', emoji: '🚩', archetypeId: 'lion' },
      { text: 'A snack pouch to share with all forest creatures', emoji: '🍎', archetypeId: 'dolphin' },
      { text: 'A sketchbook and watercolor set to paint the sunset', emoji: '🖌️', archetypeId: 'chameleon' },
      { text: 'A cozy tent and a trusty compass', emoji: '🧭', archetypeId: 'turtle' },
      { text: 'A basket full of fun gadgets and shiny treasures', emoji: '✨', archetypeId: 'squirrel' }
    ]
  }
];

export const PRIMARY_ANXIETY_QUESTIONS: AnxietyQuestion[] = [
  {
    id: 1,
    question: 'Do you get butterflies in your tummy before a test or when answering in class?',
    subtext: 'That fluttery, nervous feeling inside your stomach.',
    category: 'physical'
  },
  {
    id: 2,
    question: 'Do you worry a lot about making a mistake or getting something wrong?',
    subtext: 'Feeling afraid someone might be upset or that you aren\'t good enough.',
    category: 'thoughts'
  },
  {
    id: 3,
    question: 'Do you feel shy, nervous, or quiet when meeting new kids or speaking up?',
    subtext: 'Your heart might beat fast or you want to hide behind someone.',
    category: 'social'
  },
  {
    id: 4,
    question: 'When it is time for bed, does your brain keep spinning with worries?',
    subtext: 'Finding it tricky to fall asleep because thoughts won\'t stop talking.',
    category: 'thoughts'
  },
  {
    id: 5,
    question: 'Do you feel restless or tense, like your muscles want to wiggle or freeze?',
    subtext: 'Feeling jittery, clenched fists, or tight shoulders.',
    category: 'physical'
  },
  {
    id: 6,
    question: 'Do you feel worried when you have to be away from home or your family?',
    subtext: 'Wondering if everything is okay when you are at school or a new place.',
    category: 'school'
  }
];

export const PRIMARY_TRIGGERS = [
  { id: 'tests', label: 'Quizzes & Spelling Tests', emoji: '📝' },
  { id: 'speaking', label: 'Speaking in front of class', emoji: '🎤' },
  { id: 'mistakes', label: 'Making a mistake / failing', emoji: '❌' },
  { id: 'conflict', label: 'Friend arguments / teasing', emoji: '💔' },
  { id: 'noise', label: 'Loud, busy cafeteria / gym', emoji: '📢' },
  { id: 'bedtime', label: 'Sleeping alone in the dark', emoji: '🌙' },
  { id: 'rushed', label: 'Being rushed to finish quickly', emoji: '⏰' }
];

export const PRIMARY_COPING_TOOLS: CopingResource[] = [
  {
    id: 'belly-breathing',
    title: 'Magic Balloon Breathing',
    category: 'breathing',
    duration: '2 minutes',
    description: 'Put your hands on your tummy. As you breathe in, blow up a bright colorful balloon. As you breathe out, let the air swoosh gently out.',
    tags: ['Calm Tummy', 'Quick Relief', 'Anywhere'],
    suitableFor: ['primary']
  },
  {
    id: 'starfish-breathing',
    title: 'Starfish Hand Trace',
    category: 'breathing',
    duration: '1 minute',
    description: 'Spread one hand out like a starfish. Use your other index finger to trace up each finger (breathe in) and down (breathe out).',
    tags: ['Hands-on', 'Classroom Friendly', 'Focus'],
    suitableFor: ['primary']
  },
  {
    id: 'cloud-worry',
    title: 'Worry Cloud Release',
    category: 'reframing',
    duration: '3 minutes',
    description: 'Type or imagine your worry inside a grey cloud. Watch the warm breeze carry it high into the sunshine where it turns into rainbow raindrops.',
    tags: ['Mind Relief', 'Letting Go', 'Empowering'],
    suitableFor: ['primary']
  },
  {
    id: 'safari-grounding',
    title: '5-4-3-2-1 Sensory Safari',
    category: 'grounding',
    duration: '3 minutes',
    description: 'Become a nature detective! Spot 5 things you see, 4 you can touch, 3 sounds you hear, 2 things you smell, and 1 kind thought about yourself.',
    tags: ['Focus', 'Senses', 'Anxiety Reset'],
    suitableFor: ['primary', 'secondary']
  },
  {
    id: 'wiggle-shake',
    title: 'The Silly Shake-Out',
    category: 'somatic',
    duration: '1 minute',
    description: 'Wiggle your fingers, shake your arms like cooked spaghetti, tap your feet, and blow a big raspberry breath to dump out extra nervous energy!',
    tags: ['Fun', 'Movement', 'Energy Release'],
    suitableFor: ['primary']
  },
  {
    id: 'safe-person',
    title: 'Help Card for Teacher / Parent',
    category: 'action',
    duration: 'Instant',
    description: 'Easy words you can say when feeling overwhelmed: "My brain has too many tabs open today. Can I have 2 minutes of water and quiet?"',
    tags: ['Support', 'Communication', 'Safe'],
    suitableFor: ['primary']
  }
];

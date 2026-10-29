// All routine content lives here. To change the plan, edit this file only.
//
// Exercise fields
//   id            unique, used to save progress
//   name, detail  shown in lists ("3 sets, 8 to 12 reps")
//   sets          number of sets, shows set dots in the workout player
//   target        big text in the player for exercises without a timer
//   timerSeconds  adds a countdown timer (per hold or per set)
//   timerNote     small caption under the timer
//   videoId       a specific YouTube video (the part after v= in the URL)
//   searchQuery   used for a YouTube search link when there is no pinned video
//   cue, mod      form cue and beginner modification

export const FOCUS = {
  upper: {
    label: "Upper Body and Core",
    duration: "15 to 20 min",
    exercises: [
      {
        id: "pushups",
        name: "Push-Ups",
        detail: "3 sets, 8 to 12 reps",
        sets: 3,
        target: "8 to 12 reps",
        videoId: "IODxDxX7oi4",
        cue: "Keep your body in one straight line from head to heels. Angle your elbows back around 45 degrees instead of flaring them out to the side.",
        mod: "If a full push-up feels too heavy, place your hands on a sturdy desk or wall and push up from there instead.",
      },
      {
        id: "plank",
        name: "Plank Hold",
        detail: "3 sets, 30 to 45 sec",
        sets: 3,
        timerSeconds: 40,
        timerNote: "per set",
        searchQuery: "plank proper form tutorial",
        cue: "Keep your hips level with your shoulders and brace your core. Don't let your lower back sag toward the floor.",
      },
      {
        id: "wrist",
        name: "Wrist Stretches",
        detail: "2 min total",
        timerSeconds: 20,
        timerNote: "per hold, repeat for 2 min",
        videoId: "r6S61kZ1jdM",
        cue: "Extend one arm out with your palm facing away, then gently pull your fingers back with your other hand. Hold, then switch sides.",
      },
    ],
  },
  lower: {
    label: "Lower Body and Posture",
    duration: "15 to 20 min",
    exercises: [
      {
        id: "wallsit",
        name: "Wall Sits",
        detail: "3 sets, 30 to 60 sec",
        sets: 3,
        timerSeconds: 45,
        timerNote: "per set",
        videoId: "JQ2JBphtUk8",
        cue: "Slide down until your thighs are parallel to the ground. Press your lower back flat against the wall and keep your hands off your knees.",
      },
      {
        id: "squats",
        name: "Bodyweight Squats",
        detail: "3 sets, 10 to 15 reps",
        sets: 3,
        target: "10 to 15 reps",
        searchQuery: "bodyweight squat proper form tutorial",
        cue: "Keep your chest up and your weight in your heels as you lower down, like sitting back into a chair.",
      },
      {
        id: "posture",
        name: "Posture Reset Stretch",
        detail: "3 min",
        timerSeconds: 180,
        timerNote: "full routine",
        videoId: "mtWKFZ9xtrg",
        cue: "Open through the chest and roll your shoulders back and down to counter a hunched, forward posture.",
      },
    ],
  },
  mobility: {
    label: "Active Mobility",
    duration: "15 to 20 min",
    exercises: [
      {
        id: "deskstretch",
        name: "Desk Stretches",
        detail: "Hamstrings, hips, neck",
        target: "Hamstrings, hips, neck",
        videoId: "vRQdJQ3Xhzk",
        cue: "Ease into each stretch slowly and hold it, don't bounce, for about 20 to 30 seconds per side.",
      },
      {
        id: "thoracic",
        name: "Thoracic Spine Twists",
        detail: "2 sets, 8 to 10 per side",
        sets: 2,
        target: "8 to 10 per side",
        videoId: "vRQdJQ3Xhzk",
        cue: "Rotate from your mid-back rather than your lower back, and keep your hips facing forward the whole time.",
      },
    ],
  },
  rest: {
    label: "Rest and Light Walk",
    duration: "20 to 30 min",
    exercises: [
      {
        id: "walk",
        name: "Brisk Outdoor Walk",
        detail: "20 to 30 min",
        target: "20 to 30 min",
        cue: "Keep the pace easy and conversational. Today is for recovery, not training.",
      },
    ],
  },
};

export const WEEK_ORDER = ["upper", "lower", "mobility", "upper", "lower", "rest", "rest"];
export const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Optional. Does not count toward the streak or the movement log.
export const EXTRA_EXERCISES = [
  {
    id: "chintuck",
    name: "Chin Tucks",
    detail: "2 sets, 8 to 10 reps",
    sets: 2,
    target: "8 to 10 reps",
    videoId: "1hWi5suvct8",
    cue: "Draw your chin straight back, like making a double chin, without tilting your head down. Hold 3 seconds, then release.",
  },
  {
    id: "scapular",
    name: "Shoulder Blade Squeezes",
    detail: "2 sets, 10 reps",
    sets: 2,
    target: "10 reps",
    searchQuery: "shoulder blade squeeze scapular retraction exercise tutorial",
    cue: "Pull your shoulder blades back and together, as if pinching a pencil between them, keeping your shoulders down away from your ears.",
  },
  {
    id: "catcow",
    name: "Cat-Cow Stretch",
    detail: "1 to 2 min, slow flow",
    timerSeconds: 60,
    timerNote: "slow flow",
    videoId: "xyNwxiuERXc",
    cue: "On hands and knees, inhale as you drop your belly and lift your chest, then exhale as you round your spine toward the ceiling. Move slowly between the two.",
  },
  {
    id: "hipflexor",
    name: "Kneeling Hip Flexor Stretch",
    detail: "2 sets, 30 sec per side",
    sets: 2,
    timerSeconds: 30,
    timerNote: "per side",
    videoId: "KT0HlPGCl6k",
    cue: "Kneel on one knee with the other foot planted in front, then gently push your hips forward while keeping your torso upright until you feel a stretch across the front of the hip.",
  },
  {
    id: "eyerest",
    name: "20-20-20 Eye Rest",
    detail: "Every 20 min of screen time",
    timerSeconds: 20,
    timerNote: "look 20 feet away",
    cue: "Look at something at least 20 feet away for 20 seconds. It relaxes the small focusing muscles in your eyes after a long stretch of screen time.",
  },
  {
    id: "calfraise",
    name: "Calf Raises",
    detail: "2 sets, 15 to 20 reps",
    sets: 2,
    target: "15 to 20 reps",
    searchQuery: "standing calf raise proper form tutorial",
    cue: "Rise slowly onto your toes, pause at the top, then lower with control. Easy to fit in while standing at your desk or on a call.",
  },
];

// Comprehensive Workout Database with exercises categorized by muscle group

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
  tips: string[];
  muscleWikiUrl?: string;
  imageUrl: string;
}

export const muscleGroups = [
  { id: "chest", name: "CHEST",  color: "primary" },
  { id: "back", name: "BACK", color: "accent" },
  { id: "shoulders", name: "SHOULDERS", color: "primary" },
  { id: "arms", name: "ARMS", color: "accent" },
  { id: "legs", name: "LEGS",  color: "primary" },
  { id: "core", name: "CORE",  color: "accent" },
  { id: "cardio", name: "CARDIO", color: "destructive" },
];

// Using placeholder workout images
const getExerciseImage = (exerciseType: string) => {
  const baseUrl = "https://images.unsplash.com/";
  const images: Record<string, string> = {
    bench: "photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    dumbbell: "photo-1581009146145-b5ef050c149a?w=400&h=300&fit=crop",
    cable: "photo-1597452485669-2c7bb5fef90d?w=400&h=300&fit=crop",
    pushup: "photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop",
    deadlift: "photo-1517963879433-6ad2b056d712?w=400&h=300&fit=crop",
    pullup: "photo-1597347316205-36f6c451902a?w=400&h=300&fit=crop",
    row: "photo-1541534741688-6078c6bfb5c5?w=400&h=300&fit=crop",
    shoulder: "photo-1532029837206-abbe2b7620e3?w=400&h=300&fit=crop",
    curl: "photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
    tricep: "photo-1530822847156-5df684ec5ee1?w=400&h=300&fit=crop",
    squat: "photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop",
    leg: "photo-1434608519344-49d77a699e1d?w=400&h=300&fit=crop",
    core: "photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    cardio: "photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop",
    default: "photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
  };
  return baseUrl + (images[exerciseType] || images.default);
};

export const exerciseDatabase: Exercise[] = [
  // CHEST
  { id: "c1", name: "Barbell Bench Press", muscleGroup: "chest", equipment: "Barbell", description: "Classic chest builder targeting pectoralis major", tips: ["Keep feet flat", "Arch lower back slightly", "Lower to mid-chest"], imageUrl: "https://sportbama.com/images/barbell-bench-press-benefits-1024x576.jpg" },
  { id: "c2", name: "Incline Dumbbell Press", muscleGroup: "chest", equipment: "Dumbbells", description: "Targets upper chest fibers", tips: ["30-45 degree angle", "Control the weight", "Squeeze at top"], imageUrl: "https://findhealthtips.com/wp-content/uploads/2015/08/Incline-dumbbell-press.jpg" },
  { id: "c3", name: "Decline Bench Press", muscleGroup: "chest", equipment: "Barbell", description: "Targets lower chest fibers", tips: ["Secure legs properly", "Control descent", "Full range of motion"], imageUrl: "https://bodybuilding-wizard.com/wp-content/uploads/2015/11/decline-dumbbell-bench-press-guide-1-8.jpg" },
  { id: "c4", name: "Dumbbell Fly", muscleGroup: "chest", equipment: "Dumbbells", description: "Chest isolation for stretch", tips: ["Slight bend in elbows", "Feel the stretch", "Don't go too heavy"], imageUrl: "https://www.verywellfit.com/thmb/h-GF1obQrmZgJ1ge3LYbbBl48vc=/4992x3872/filters:no_upscale():max_bytes(150000):strip_icc()/dumbbell-fly-on-incline-bench--steps--162974795-99bf05fa00e14abf8c240b41ed567fcd.jpg" },
  { id: "c5", name: "Cable Crossover", muscleGroup: "chest", equipment: "Cable Machine", description: "Constant tension throughout", tips: ["Lean slightly forward", "Cross hands at bottom", "Control the negative"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2024/02/cable-crossover-exercise-overview.png" },
  { id: "c6", name: "Push-Ups", muscleGroup: "chest", equipment: "Bodyweight", description: "Fundamental movement pattern", tips: ["Keep core tight", "Full range of motion", "Vary hand position"], imageUrl: "https://www.fitnesseducation.edu.au/wp-content/uploads/2017/03/Pushups.jpg" },
  { id: "c7", name: "Chest Dips", muscleGroup: "chest", equipment: "Dip Bars", description: "Compound chest movement", tips: ["Lean forward", "Go deep", "Control the movement"], imageUrl: "https://www.aleanlife.com/wp-content/uploads/2014/01/chest-chest-dips.jpg" },
  { id: "c8", name: "Pec Deck Machine", muscleGroup: "chest", equipment: "Machine", description: "Safe isolation exercise", tips: ["Squeeze at peak", "Control return", "Keep back flat"], imageUrl: "https://th.bing.com/th/id/R.7bbbaaafbc3b5dfe109655a8e90a037e?rik=VlQ6mlubEe29mg&riu=http%3a%2f%2f1.bp.blogspot.com%2f-izV7V-6GMBg%2fUcCena95sKI%2fAAAAAAAAAyU%2fHW7Y03lqLp8%2fs1600%2fPec-Deck.jpg&ehk=wuKbQ4oCCIU0v%2fV8LK8pMprtxc3OAXjmPJmE5oqFMAY%3d&risl=&pid=ImgRaw&r=0" },

  // BACK
  { id: "b1", name: "Deadlift", muscleGroup: "back", equipment: "Barbell", description: "King of compound lifts", tips: ["Keep bar close", "Neutral spine", "Drive through heels"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/10/deficit-deadlift-benefits.png" },
  { id: "b2", name: "Bent Over Row", muscleGroup: "back", equipment: "Barbell", description: "Back mass builder", tips: ["45-degree torso", "Pull to navel", "Squeeze shoulder blades"], imageUrl: "https://liftmanual.com/wp-content/uploads/2023/04/barbell-reverse-grip-bent-over-row-1024x538.jpg" },
  { id: "b3", name: "Lat Pulldown", muscleGroup: "back", equipment: "Cable Machine", description: "Lat width developer", tips: ["Pull to upper chest", "Lean back slightly", "Control the negative"], imageUrl: "https://i.pinimg.com/736x/c0/fe/9e/c0fe9ed6b12073800f817edb57957eaf.jpg" },
  { id: "b4", name: "Pull-Ups", muscleGroup: "back", equipment: "Bodyweight", description: "Ultimate back exercise", tips: ["Full extension", "Lead with chest", "Vary grip width"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/04/close-grip-pull-up-benefits.png" },
  { id: "b5", name: "Seated Cable Row", muscleGroup: "back", equipment: "Cable Machine", description: "Mid-back focus", tips: ["Keep chest up", "Pull to stomach", "Squeeze at contraction"], imageUrl: "https://fitnessvolt.com/wp-content/uploads/2023/07/Close-Grip-Row-Muscles-Worked-1140x570.jpg" },
  { id: "b6", name: "T-Bar Row", muscleGroup: "back", equipment: "Barbell", description: "Thickness builder", tips: ["Keep back flat", "Pull high", "Control the weight"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/03/t-bar-row-benefits.png" },
  { id: "b7", name: "Single Arm Dumbbell Row", muscleGroup: "back", equipment: "Dumbbell", description: "Unilateral work", tips: ["Support on bench", "Pull to hip", "Full stretch at bottom"], imageUrl: "https://th.bing.com/th/id/R.83249e254b55c4321bfa31f37827a5d1?rik=26NY2ibRAZVacQ&riu=http%3a%2f%2fbodybuilding-wizard.com%2fwp-content%2fuploads%2f2014%2f04%2fone-arm-dumbbell-row-exercise-guide-01.jpg&ehk=y1j4lUzLtemMjFObdLj3N9eHQ2tu1mLVM7P%2bG9DmiTk%3d&risl=&pid=ImgRaw&r=0" },
  { id: "b8", name: "Face Pulls", muscleGroup: "back", equipment: "Cable Machine", description: "Rear delt/traps", tips: ["Pull to forehead", "External rotation", "Squeeze at end"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/06/face-pull-benefits.png" },

  // SHOULDERS
  { id: "s1", name: "Overhead Press", muscleGroup: "shoulders", equipment: "Barbell", description: "Shoulder mass builder", tips: ["Core tight", "Press overhead", "Full lockout"], imageUrl: "https://www.burnthefatinnercircle.com/members/images/1660b.jpg" },
  { id: "s2", name: "Dumbbell Shoulder Press", muscleGroup: "shoulders", equipment: "Dumbbells", description: "Balanced development", tips: ["Control the path", "Don't flare elbows", "Press to full extension"], imageUrl: "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-seated-shoulder-press-1024x538.jpg" },
  { id: "s3", name: "Lateral Raises", muscleGroup: "shoulders", equipment: "Dumbbells", description: "Side delt isolation", tips: ["Slight forward lean", "Lead with pinky", "Don't swing"], imageUrl: "https://www.fitliferegime.com/wp-content/uploads/2021/11/Dumbbell-one-arm-lateral-raise.jpg" },
  { id: "s4", name: "Front Raises", muscleGroup: "shoulders", equipment: "Dumbbells", description: "Front delt focus", tips: ["Alternate arms", "Control the weight", "Don't use momentum"], imageUrl: "https://www.aleanlife.com/wp-content/uploads/2023/02/dumbbell-front-raise.jpg" },
  { id: "s5", name: "Reverse Fly", muscleGroup: "shoulders", equipment: "Dumbbells", description: "Rear delt focus", tips: ["Bend at hips", "Lead with elbows", "Squeeze at top"], imageUrl: "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-rear-lateral-raise-1024x538.jpg" },
  { id: "s6", name: "Arnold Press", muscleGroup: "shoulders", equipment: "Dumbbells", description: "Complete shoulder work", tips: ["Start palms facing you", "Rotate as you press", "Full range of motion"], imageUrl: "https://www.bodybuildingmealplan.com/wp-content/uploads/shutterstock_428906836-scaled.jpg" },
  { id: "s7", name: "Upright Row", muscleGroup: "shoulders", equipment: "Barbell", description: "Traps and delts", tips: ["Wide grip for delts", "Pull to chin", "Lead with elbows"], imageUrl: "https://www.bodybuildingmealplan.com/wp-content/uploads/Wide-Grip-Upright-Row-scaled.jpg" },
  { id: "s8", name: "Shrugs", muscleGroup: "shoulders", equipment: "Barbell/Dumbbells", description: "Trap development", tips: ["Heavy weight OK", "Hold at top", "No rolling"], imageUrl: "https://tse4.mm.bing.net/th/id/OIP.SiuNqkRTpiXGXOvrJQcHGgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" },

  // ARMS
  { id: "a1", name: "Barbell Curl", muscleGroup: "arms", equipment: "Barbell", description: "Bicep mass builder", tips: ["Keep elbows fixed", "Full range", "Control negative"], imageUrl: "https://cdn.shopify.com/s/files/1/1075/8446/files/exercise-41.jpg?0" },
  { id: "a2", name: "Dumbbell Curl", muscleGroup: "arms", equipment: "Dumbbells", description: "Bicep isolation", tips: ["Supinate at top", "Alternate or together", "No swinging"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/04/dumbbell-curl-benefits.png" },
  { id: "a3", name: "Hammer Curl", muscleGroup: "arms", equipment: "Dumbbells", description: "Brachialis focus", tips: ["Neutral grip", "Control the weight", "Keep elbows steady"], imageUrl: "https://tse1.mm.bing.net/th/id/OIP.I8qmpYgzM9V3lGFzbcw5JgHaH6?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: "a4", name: "Preacher Curl", muscleGroup: "arms", equipment: "Barbell/Dumbbell", description: "Strict isolation", tips: ["Full stretch", "Control the negative", "Don't swing"], imageUrl: "https://workoutguru.fit/wp-content/uploads/2023/10/ez-barbell-preacher-curl-video-exercise-guide-tips.jpg" },
  { id: "a5", name: "Tricep Pushdown", muscleGroup: "arms", equipment: "Cable Machine", description: "Tricep isolation", tips: ["Keep elbows fixed", "Full extension", "Squeeze at bottom"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/03/trice-pushdown-benefits.png" },
  { id: "a6", name: "Skull Crushers", muscleGroup: "arms", equipment: "Barbell/EZ Bar", description: "Tricep mass", tips: ["Lower to forehead", "Keep elbows in", "Control the weight"], imageUrl: "https://www.blackridgefitness.com/wp-content/uploads/2021/01/3a5490cf4a643283ac9c771a88bccd98-768x403.jpg" },
  { id: "a7", name: "Overhead Tricep Extension", muscleGroup: "arms", equipment: "Dumbbell/Cable", description: "Long head focus", tips: ["Keep elbows close", "Full stretch", "Control throughout"], imageUrl: "https://www.fitliferegime.com/wp-content/uploads/2022/01/Two-Arm-Dumbbell-Extension..jpg" },
  { id: "a8", name: "Close Grip Bench Press", muscleGroup: "arms", equipment: "Barbell", description: "Tricep compound", tips: ["Hands shoulder-width", "Elbows close to body", "Full range"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/close-grip-bench-benefits.jpg" },
  { id: "a9", name: "Concentration Curl", muscleGroup: "arms", equipment: "Dumbbell", description: "Peak contraction", tips: ["Elbow on inner thigh", "Slow and controlled", "Squeeze at top"], imageUrl: "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-concentration-curl.jpg" },
  { id: "a10", name: "Tricep Dips", muscleGroup: "arms", equipment: "Bench/Bars", description: "Bodyweight tricep", tips: ["Keep body close", "Go deep", "Don't flare elbows"], imageUrl: "https://www.aleanlife.com/wp-content/uploads/2020/08/tricep-dips-with-chair.jpg" },

  // LEGS
  { id: "l1", name: "Barbell Squat", muscleGroup: "legs", equipment: "Barbell", description: "King of leg exercises", tips: ["Break at hips first", "Knees track toes", "Depth is key"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/06/the-barbell-squat.jpg" },
  { id: "l2", name: "Leg Press", muscleGroup: "legs", equipment: "Machine", description: "Quad focused", tips: ["Don't lock knees", "Control the descent", "Vary foot position"], imageUrl: "https://sportivetricksstorage.blob.core.windows.net/images/articles/training/technique/leg-press-muscles-worked/2-muscles-worked.webp" },
  { id: "l3", name: "Romanian Deadlift", muscleGroup: "legs", equipment: "Barbell", description: "Hamstring focus", tips: ["Slight knee bend", "Hinge at hips", "Feel the stretch"], imageUrl: "https://bodybuilding-wizard.com/wp-content/uploads/2015/01/romanian-deadlift-exercise-1-2-6-9.jpg" },
  { id: "l4", name: "Leg Curl", muscleGroup: "legs", equipment: "Machine", description: "Hamstring isolation", tips: ["Full range of motion", "Squeeze at peak", "Control negative"], imageUrl: "https://workoutguru.fit/wp-content/uploads/2023/10/lever-seated-leg-curl-video-exercise-guide-tips-1024x576.jpg" },
  { id: "l5", name: "Leg Extension", muscleGroup: "legs", equipment: "Machine", description: "Quad isolation", tips: ["Full extension", "Pause at top", "Control descent"], imageUrl: "https://muscu-street-et-crossfit.fr/wp-content/uploads/2022/09/Muscles-Leg-Extension.001.jpeg" },
  { id: "l6", name: "Lunges", muscleGroup: "legs", equipment: "Bodyweight/Dumbbells", description: "Unilateral work", tips: ["Knee tracks toe", "Upright torso", "Step far enough"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/07/split-squat-vs-lunge.png" },
  { id: "l7", name: "Calf Raises", muscleGroup: "legs", equipment: "Machine/Bodyweight", description: "Calf development", tips: ["Full stretch at bottom", "Pause at top", "Slow negatives"], imageUrl: "https://fitnessvolt.com/wp-content/uploads/2021/02/dumbbell-standing-calf-raise-.jpg" },
  { id: "l8", name: "Bulgarian Split Squat", muscleGroup: "legs", equipment: "Dumbbells/Bodyweight", description: "Single leg power", tips: ["Back foot elevated", "Stay upright", "Control descent"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/08/bulgarian-split-squat-variations.png" },
  { id: "l9", name: "Hack Squat", muscleGroup: "legs", equipment: "Machine", description: "Quad dominant", tips: ["Feet lower for quads", "Full depth", "Don't lock out"], imageUrl: "https://tse4.mm.bing.net/th/id/OIP.-I8mavUzVgjL_NsHsosztQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: "l10", name: "Sumo Deadlift", muscleGroup: "legs", equipment: "Barbell", description: "Inner thigh focus", tips: ["Wide stance", "Toes out", "Push floor apart"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/05/is-sumo-deadlift-easier.jpg" },

  // CORE
  { id: "co1", name: "Plank", muscleGroup: "core", equipment: "Bodyweight", description: "Core stability", tips: ["Keep body straight", "Squeeze glutes", "Don't drop hips"], imageUrl: "https://cdn-ami-drupal.heartyhosting.com/sites/muscleandfitness.com/files/plank-chest-main.jpg" },
  { id: "co2", name: "Hanging Leg Raise", muscleGroup: "core", equipment: "Pull-up Bar", description: "Lower ab focus", tips: ["Control the swing", "Raise legs high", "Slow descent"], imageUrl: "https://kinxlearning.com/cdn/shop/files/exercise-21_923x.jpg?v=1613154789" },
  { id: "co3", name: "Cable Crunch", muscleGroup: "core", equipment: "Cable Machine", description: "Weighted ab work", tips: ["Crunch down", "Don't pull with arms", "Feel the squeeze"], imageUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/10/cable-kneeling-crunch-benefits.png" },
  { id: "co4", name: "Russian Twist", muscleGroup: "core", equipment: "Bodyweight/Weight", description: "Oblique focus", tips: ["Lean back slightly", "Rotate fully", "Keep feet elevated"], imageUrl: "https://www.lyfta.app/thumbnails/43931201.jpg" },
  { id: "co5", name: "Ab Wheel Rollout", muscleGroup: "core", equipment: "Ab Wheel", description: "Advanced core", tips: ["Keep core tight", "Go as far as possible", "Control the roll"], imageUrl: "https://tse3.mm.bing.net/th/id/OIP.8vRBTgvEv5CuYm5l6O9crQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: "co6", name: "Mountain Climbers", muscleGroup: "core", equipment: "Bodyweight", description: "Core and cardio", tips: ["Keep hips down", "Fast pace", "Full range"], imageUrl: "https://liftmanual.com/wp-content/uploads/2023/04/mountain-climber-jump.jpg" },
  { id: "co7", name: "Bicycle Crunches", muscleGroup: "core", equipment: "Bodyweight", description: "Oblique activation", tips: ["Elbow to opposite knee", "Controlled pace", "Full rotation"], imageUrl: "https://liftmanual.com/wp-content/uploads/2023/04/bicycle-crunch.jpg" },
  { id: "co8", name: "Dead Bug", muscleGroup: "core", equipment: "Bodyweight", description: "Core control", tips: ["Lower back flat", "Opposite arm/leg", "Controlled breathing"], imageUrl: "https://static.wixstatic.com/media/2edbed_1b72e8a640234a1c880144620557ecd6~mv2.jpg/v1/fill/w_980,h_551,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2edbed_1b72e8a640234a1c880144620557ecd6~mv2.jpg" },

  // CARDIOs
  { id: "ca1", name: "Treadmill Running", muscleGroup: "cardio", equipment: "Treadmill", description: "Classic cardio", tips: ["Start slow", "Incline for intensity", "Proper form"], imageUrl: "https://runnerslab.com/wp-content/uploads/2022/08/how_to_run_on_a_treadmill.jpg" },
  { id: "ca2", name: "Cycling", muscleGroup: "cardio", equipment: "Bike", description: "Low impact cardio", tips: ["Adjust seat height", "Maintain cadence", "Use resistance"], imageUrl: "https://static.vecteezy.com/system/resources/previews/033/330/320/non_2x/cropped-image-of-young-man-cycling-on-exercise-bike-in-gym-woman-on-a-fitness-exercise-bike-indoors-top-section-cropped-ai-generated-free-photo.jpg" },
  { id: "ca3", name: "Rowing Machine", muscleGroup: "cardio", equipment: "Rower", description: "Full body cardio", tips: ["Legs first", "Then lean back", "Arms last"], imageUrl: "https://cdn.webshopapp.com/shops/281654/files/284691729/rowing-machine-fitrow-50.jpg" },
  { id: "ca4", name: "Jump Rope", muscleGroup: "cardio", equipment: "Jump Rope", description: "High intensity", tips: ["Stay on toes", "Wrists do the work", "Keep jumps small"], imageUrl: "https://prod-academy-wp-content-uploads.s3.amazonaws.com/2016/07/jumpropechoice.jpg" },
  { id: "ca5", name: "Stair Climber", muscleGroup: "cardio", equipment: "Machine", description: "Leg-focused cardio", tips: ["Don't lean on rails", "Full steps", "Steady pace"], imageUrl: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1608150122-og_img_fb-artis_climb.jpg?crop=0.523xw:1xh;center,top&resize=980:*" },
  { id: "ca6", name: "Battle Ropes", muscleGroup: "cardio", equipment: "Battle Ropes", description: "HIIT cardio", tips: ["Use full body", "Create big waves", "Stay in athletic stance"], imageUrl: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-657495548-1527710829.jpg" },
  { id: "ca7", name: "Burpees", muscleGroup: "cardio", equipment: "Bodyweight", description: "Full body HIIT", tips: ["Explosive jump", "Chest to floor", "Fast pace"], imageUrl: "https://th.bing.com/th/id/R.8a4e5babe2b5d3384fa265aff599f224?rik=7u2uxYuuvtbrqw&riu=http%3a%2f%2fhiitacademy.com%2fwp-content%2fuploads%2f2015%2f02%2fburpees.jpg&ehk=aCrs9y7%2f0lrmsN%2bXff1mxbuJc6SPnccrQ4C8BLum5g0%3d&risl=&pid=ImgRaw&r=0" },
  { id: "ca8", name: "Box Jumps", muscleGroup: "cardio", equipment: "Plyo Box", description: "Explosive power", tips: ["Land softly", "Step down", "Use arms for momentum"], imageUrl: "https://www.shape.com/thmb/awFQ4our_lBcZyT8l-dD3_UqAZ8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wide-box-jumps-baa219df5ca34d22b580f2d7fa07cb51.jpg" },
];

export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  return exerciseDatabase.filter(ex => ex.muscleGroup === muscleGroup);
};
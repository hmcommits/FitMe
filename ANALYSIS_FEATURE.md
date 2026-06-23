### Level 1: The Main Dashboard (The Bird's-Eye View)

This is the first screen you see when you click "Analysis." It focuses on overall trends and systemic changes. Showing a stacked bar chart in the beginning and then the menu of different muscle groups.

**Total Weekly Volume (The "Calorie Burn" Indicator):**
* **Chart Type:** Stacked Bar Chart.
* **X-Axis:** Weeks (e.g., Week 1, Week 2). *Never use days here to avoid the "Leg Day Spike" distortion.*
* **Y-Axis:** Total Weight Moved in kg.
* **Data:** `Sum(Sets × Reps × Weight)` for all exercises that week.
* **Visuals:** Each bar is stacked with different colors representing muscle groups (e.g., Blue for Chest, Red for Back).

**Consistency Heatmap:**
* **Chart Type:** GitHub-style daily grid.
* **Insight:** A simple visual tracker showing dark squares for days completing workouts.



### Level 2: Muscle Group Drill-Down

When you select a specific muscle group from menu, you go one level deeper. a graph at the top and menu of each exercise performed of that particular muscle group.

**Combined Muscle Development of that particular muscle group:**
* **Chart Type:** Line Graph.
* **X-Axis:** Workout Sessions (Dates).
* **Y-Axis:** Total Volume(Sum(Sets × Reps × Weight)) (kg) for that specific muscle group.
* **Insight:** Shows if your chest workload is trending upward over time, which dictates muscle definition.


**Exercise Menu List:**
* **UI Element:** A scrollable list of all exercises you've ever performed for that muscle group (e.g., Flat Bench, Incline Bench, Cable Flys).
* **Context:** Each item should show a mini-summary, like "Last performed: 22/06/2026 | Max Volume: 1,500kg" and how much times performed in the selected duration.



### Level 3: Exercise Specific Detail

When you tap a specific exercise (e.g., "Incline Chest Press") from the menu, you get the most granular data.

**The 3-Tab Analytical Graph:**
* **UI Element:** A single graph area with three toggle buttons at the top: `Weight` | `Reps` | `Volume`.
* **Weight Tab (Strength):** Plots your heaviest set for that day. Tells you if you are getting stronger.
* **Reps Tab (Endurance):** Plots total reps achieved.
* **Volume Tab (Total Work):** Plots `Sets × Reps × Weight` just for this specific movement.
* **Insight:** Separating these prevents the "garbage data" issue of trying to mix reps and kilos on the same graph.

### Cardio Analytics section:

### Level 1: The Main Cardio Dashboard (Daily View)

This is the front page of your Cardio tab.

* **The Concept:** A Daily Bar Chart.
* **X-Axis:** Days of the month (e.g., 1st, 2nd, 3rd...).
* **Y-Axis:** Total Duration (Minutes).
* **Visual Strategy:** Just like the strength chart, you can color-code the bars based on the machine you used that day. For example, Monday's 30-minute bar is Blue (Treadmill), Tuesday's 25-minute bar is Green (Cycling). This gives you an instant visual of your daily aerobic consistency.

### Level 2: Standard Equipment Drill-Down

If you tap on "Treadmill," "Cycling," or "Elliptical" from a menu below the main graph:

* **The Concept:** A simple Daily Trend Line or Bar Chart.
* **X-Axis:** Dates you performed this specific cardio.
* **Y-Axis:** Duration (Minutes).
* **Insight:** This simply shows, "Am I consistently doing my 30 minutes of treadmill walking, or am I getting lazy and cutting it down to 15 minutes?"

### Level 3: The Stair Master Exception (Duration + Speed)

The Stair Master is a beast of a machine. Doing 20 minutes at Level 4 is a completely different workout than doing 20 minutes at Level 8. Therefore, duration alone doesn't tell the whole story.

When you tap "Stair Master," the app should display **Two Separate Graphs** (or a tabbed view):

1. **Graph A (Duration):** Bar chart showing the minutes spent.
2. **Graph B (Speed/Intensity):** A Line chart showing your average Speed (Steps Per Minute) or Level.

* **Insight:** If your Duration graph stays flat at "25 minutes," but your Speed line graph is slowly climbing week over week, you have absolute proof that your cardiovascular engine is getting stronger and burning more fat in the exact same amount of time.

### Global UI & UX Rules (The "Smoothness" Factors)

To make the app feel professional and accurate, implement these global rules:

**Smart Date Filtering:**
* Provide a dropdown at the top of every analysis screen: `Last 30 Days` (Default), `Last 3 Months`, `Last 6 Months`, `All Time`.
* Include a visual "Delta" (e.g., a green arrow pointing up with "+15%") comparing the current period's average to the previous period.


**Automated Unit Normalization (Crucial Backend Rule):**
* Since your gym has both `kg` and `lbs` equipment, your backend must mathematically convert all `lbs` entries to `kg` (using `lbs × 0.453592`) *before* generating the graphs.
* If you don't do this, mixing 25 lbs and 15 kg will ruin the Volume calculations.


**Ignore "Zero" Days:**
* On line graphs (like your Chest Development graph), do not plot days where you didn't train chest as "0". Just connect the line between the days you *did* train it. Plotting zeros creates a messy, zigzagging chart.

along with this, create a bar graph for selected duration. for "good workouts, mid workouts, bad workouts". also for workout time "morning, evening or both".

How the Formula Works: Sum(Sets × Reps × Weight)
Volume Load calculates the absolute total amount of mechanical weight your muscles moved during a session.

Let's use the DB Flat Bench Press from the sample data provided:

Set 1: 10 kg × 10 reps = 100 kg moved

Set 2: 10 kg × 10 reps = 100 kg moved

Set 3: 12.5 kg × 10 reps = 125 kg moved (assuming you hit 10 reps)

Total Volume for DB Bench Press = 325 kg.

Now, you calculate this for the Incline Press, Decline Press, Flys, etc., and add them all together. You might find that your Total Chest Volume for Monday was 2,500 kg.

If you sum up all your muscle groups for the entire 6-day week (Chest, Back, Arms, Shoulders, Legs), you might find your Total Weekly Volume is 15,000 kg.

This should be done carefully as it is not a direct multiplication of sets*repetitions*weights as the weights in each set may vary.
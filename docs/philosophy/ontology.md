# SUBIT-LUDUS Ontology

## 1. Entities

### 1.1 Archetype

* Definition: Fundamental unit of the SUBIT-64 space.
* Representation: A = (WHO, WHERE, WHEN)
* WHO ∈ {ME, WE, YOU, THEY}
* WHERE ∈ {EAST, SOUTH, WEST, NORTH}
* WHEN ∈ {SPRING, SUMMER, AUTUMN, WINTER}
* Bit encoding:

  * WHO: ME=10, WE=11, YOU=01, THEY=00
  * WHERE: EAST=10, SOUTH=11, WEST=01, NORTH=00
  * WHEN: SPRING=10, SUMMER=11, AUTUMN=01, WINTER=00

### 1.2 Player

* Can control one or multiple Archetypes.
* Goal: Form trajectories through the SUBIT space.

### 1.3 Key Nodes

* Special Archetypes representing strategic points:

  * Rukh (Movement)
  * Hero
  * Skeptic
  * Library
  * AI Archetypes: Orden, University, Archive, Library

## 2. Operations

### 2.1 Social Move (Cᴡ)

* Changes WHO coordinate.
* Cycle: ME → WE → YOU → THEY → ME

### 2.2 Spatial Move (Cʀ)

* Changes WHERE coordinate.
* Cycle: EAST → SOUTH → WEST → NORTH → EAST

### 2.3 Temporal Move (Cᵗ)

* Changes WHEN coordinate.
* Cycle: SPRING → SUMMER → AUTUMN → WINTER → SPRING

### 2.4 Mirror Move (M)

* Reflects WHERE and WHEN to opposite value.
* Optional: WHO may stay unchanged.

### 2.5 Composite Move (T)

* Combination of operations:
  T = Cᴡ ∘ Cʀ ∘ Cᵗ ∘ M

## 3. Trajectory

* Definition: Ordered sequence of Archetypes A₁ → A₂ → ... → Aₙ
* Each next archetype is derived using an operation:
  Aᵢ₊₁ = Tᵢ(Aᵢ), Tᵢ ∈ {Cᴡ, Cʀ, Cᵗ, M}
* Constraints:

  * Cannot repeat same Archetype in same position
  * Must change at least one coordinate per move

## 4. Evaluation Metrics

### 4.1 Symmetry (S)

* Measures mirroring or cyclical patterns.
* Computed via Hamming distance between Archetypes.
* S = 6 - d(A₁, Aₙ)  # Maximum 6 bits match

### 4.2 Conceptual Depth (C)

* Count of key nodes traversed in trajectory.
* Example: Rukh, Hero, Skeptic, Library

### 4.3 Historical/Logical Sequence (H)

* Measures progression in WHEN coordinate.
* Evaluates if the trajectory follows logical civilization or knowledge development

### 4.4 Total Harmony (G)

* Weighted sum: G = α·S + β·C + γ·H
* α, β, γ determined by players or system

## 5. Game Board

* 4 quadrants representing WHEN: SPRING, SUMMER, AUTUMN, WINTER
* Rows: WHO (ME, WE, YOU, THEY)
* Columns: WHERE (EAST, SOUTH, WEST, NORTH)
* Each cell = one Archetype

## 6. Rules

1. Players place Archetypes on board according to operations.
2. Must obey move constraints.
3. Trajectories evaluated using G = α·S + β·C + γ·H.
4. Objective: maximize conceptual and structural harmony.
5. Can incorporate AI Archetypes in parallel trajectories.

## 7. AI Integration

* AI archetypes: THEY/NORTH/SPRING → WINTER
* Represents emerging knowledge system
* Can interact with human trajectories
* Follows same move and evaluation rules

## 8. Notes

* SUBIT-LUDUS emphasizes **conceptual exploration over competition**.
* Trajectories can be linear, cyclical, or multi-layered.
* System allows formalization for automated evaluation or visualization.

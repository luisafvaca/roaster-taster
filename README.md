# RoasterTaster

Coffee Affective Score Calculator based on the SCA (Specialty Coffee Association) standard.

## 📋 Description

RoasterTaster is a web application for evaluating coffee quality using the SCA affective scoring system. It allows cuppers to record their sensory evaluations and obtain automatic insights about the coffee profile.

## 🧮 Calculator Calculations

### Affective Score

The affective score is calculated using the following formula:

```
Affective Score = BASE_SCORE + Sum of Quality Values - Total Penalties
```

Where:

- **BASE_SCORE** = 50.0 (base score)
- **MAX_SCORE** = 100.0 (maximum possible score)

#### 1. Sum of Quality Values

Each quality attribute (Fragrance, Aroma, Flavor, Aftertaste, Acidity, Sweetness, Mouthfeel, Overall) is mapped to a numeric value according to the following table:

| Cupper Value | Mapped Value |
| ------------ | ------------ |
| 1            | 1.0          |
| 2            | 1.75         |
| 3            | 2.25         |
| 4            | 3.0          |
| 5            | 3.75         |
| 6            | 4.25         |
| 7            | 4.9167       |
| 8            | 5.5          |
| 9            | 6.25         |

The total sum is calculated as:

```
Quality Sum = Σ (mapped_value of each attribute)
```

#### 2. Penalties

Penalties are calculated as follows:

- **Penalty for Non-Uniform Cups**:

  ```
  Penalty = Number of Non-Uniform Cups × 2.0
  ```

- **Penalty for Defective Cups**:

  ```
  Penalty = Number of Defective Cups × 4.0
  ```

- **Total Penalty**:
  ```
  Total Penalty = Non-Uniform Penalty + Defective Penalty
  ```

#### 3. Final Calculation

```
Affective Score = min(50.0 + Quality Sum - Total Penalty, 100.0)
```

The result is limited to a maximum of 100.0 points.

---

## 📊 Chart Calculations

### 1. Flavor Profile Radar Chart

**Type**: Radar Chart (Chart.js)

**Data**:

- Displays the 8 quality attributes: Fragrance, Aroma, Flavor, Aftertaste, Acidity, Sweetness, Mouthfeel, Overall
- Each point represents the direct value of the attribute (1-9)

**Scale**:

- Minimum: 0
- Maximum: 10
- Step: 1

**Formula**:

```
Point Value = scores[attribute]
```

---

### 2. Penalties Radar Chart

**Type**: Radar Chart (Chart.js)

**Data**:

- Shows the impact of penalties on each of the 8 quality attributes
- Each point represents the remaining percentage of the attribute after applying penalties

**Impact Calculation**:

1. **Total Penalty**:

   ```
   Total Penalty = (Non-Uniform Cups × 2.0) + (Defective Cups × 4.0)
   ```

2. **Maximum Possible Penalty**:

   ```
   Maximum Penalty = (5 × 2.0) + (5 × 4.0) = 30.0 points
   ```

3. **Penalty Percentage**:

   ```
   Penalty Percentage = (Total Penalty / Maximum Penalty) × 100
   ```

4. **Impact per Attribute**:
   ```
   For each attribute:
   Reduction = (Attribute Value / 9) × Penalty Percentage
   Remaining Percentage = max(100 - Reduction, 0)
   ```

**Scale**:

- Minimum: 0%
- Maximum: 100%
- Step: 20%

**Interpretation**:

- 100% = The attribute is not affected by penalties
- 0% = The attribute is completely affected by penalties
- Attributes with higher values are proportionally more affected

---

### 3. Horizontal Bar Chart for Penalties

**Type**: Custom horizontal bars

**Data**:

- Shows the quantitative impact of each type of penalty

**Impact Calculation**:

1. **Non-Uniform Cups**:

   ```
   Impact = Number of Non-Uniform Cups × 2.0
   ```

2. **Defective Cups**:
   ```
   Impact = Number of Defective Cups × 4.0
   ```

**Bar Percentage**:

```
Percentage = (Impact / Maximum Impact) × 100
```

Where:

- Maximum Impact = 20.0 (5 defective cups × 4.0)

---

## 📈 Statistics Calculations

### 1. Strongest Sensory Attribute

**Calculation**:

```
Strongest Attribute = max(fragrance, aroma, flavor, aftertaste, acidity, sweetness, mouthfeel, overall)
```

**Percentage for Radial Progress**:

```
Percentage = (Value / 9) × 100
```

**Special Case - Tie**:
If all attributes have the same value:

- Shows "–" in the radial progress
- Label: "Uniform attributes"

---

### 2. Weakest Point

**Calculation**:

```
Weakest Point = min(fragrance, aroma, flavor, aftertaste, acidity, sweetness, mouthfeel, overall)
```

**Percentage for Radial Progress**:

```
Percentage = (Value / 9) × 100
```

**Special Case - Tie**:
If all attributes have the same value:

- Shows "–" in the radial progress
- Label: "Uniform profile"

---

### 3. Overall Balance

**Standard Deviation Calculation**:

1. **Mean**:

   ```
   Mean = Σ(attribute values) / 8
   ```

2. **Standard Deviation**:
   ```
   σ = √(Σ(value - mean)² / 8)
   ```

**Categorization**:

| Standard Deviation | Status              |
| ------------------ | ------------------- |
| σ < 1.2            | Balanced            |
| 1.2 ≤ σ ≤ 2.0      | Moderately balanced |
| σ > 2.0            | Unbalanced          |

**Percentage for Radial Progress**:

```
If σ < 1.2:
  Percentage = 100 - (σ / 1.2) × 20  // Range: 80-100%

If 1.2 ≤ σ ≤ 2.0:
  Percentage = 80 - ((σ - 1.2) / 0.8) × 30  // Range: 50-80%

If σ > 2.0:
  Percentage = max(50 - ((σ - 2.0) / 2.0) × 50, 0)  // Range: 0-50%
```

---

## 💡 Automatic Insights Calculations

### Description Generation

Insights are generated using rules based on value ranges:

#### Descriptions by Attribute

**Sweetness**:

- ≥ 7: "outstanding sweetness"
- 4-6: "medium sweetness"
- < 4: "low sweetness"

**Acidity**:

- ≥ 7: "high acidity"
- 5-6: "medium acidity"
- 3-4: "low acidity"
- < 3: "very low acidity"

**Fragrance**:

- ≥ 7: "high fragrance"
- 5-6: "medium fragrance"
- < 5: "low fragrance"

**Aftertaste**:

- ≥ 7: "long and persistent aftertaste"
- 5-6: "medium aftertaste"
- 3-4: "short aftertaste"
- < 3: "very short aftertaste"

**Aroma**:

- ≥ 7: "intense aroma"
- 5-6: "moderate aroma"
- < 5: "soft aroma"

**Flavor**:

- ≥ 7: "complex flavor"
- 5-6: "balanced flavor"
- < 5: "simple flavor"

**Mouthfeel**:

- ≥ 7: "full body"
- 5-6: "medium body"
- < 5: "light body"

#### General Interpretation

**Calculation**:

```
Quality Average = Σ(attributes) / 8
```

**Categorization**:

- Average ≥ 7: "a high-quality profile"
- Average 5-6: "a balanced profile"
- Average < 5: "a profile that requires attention"

#### Brewing Method Suggestions

Suggestions are based on attribute combinations:

1. **Acidity ≥ 7 and Sweetness ≥ 6**:
   → "methods that highlight acidity and sweetness, such as V60 or Chemex"

2. **Sweetness ≥ 7 and Mouthfeel ≥ 6**:
   → "methods that enhance body, such as French Press or AeroPress"

3. **Acidity ≥ 7**:
   → "filter methods that highlight acidity, such as V60"

4. **Mouthfeel ≥ 7**:
   → "immersion methods such as French Press or AeroPress"

5. **Default**:
   → "versatile methods such as V60 or AeroPress"

---

## 🛠️ Technologies Used

- **Vue 3** - JavaScript framework
- **TypeScript** - Static typing
- **Chart.js** - Interactive charts
- **DaisyUI** - CSS framework
- **Tailwind CSS v4** - Utility styles
- **Vue I18n** - Internationalization

## 📦 Installation

```sh
yarn
```

## 🚀 Development

```sh
yarn dev
```

## 🏗️ Build

```sh
yarn build
```

## 🧪 Testing

```sh
# Unit tests
yarn test:unit

# End-to-end tests
yarn test:e2e:dev
```

## 📝 Linting

```sh
yarn lint
```

## 🌐 Supported Languages

- Spanish (es)
- English (en)
- Italian (it)
- Portuguese (pt)

## 📄 License

This project is licensed under the MIT License.

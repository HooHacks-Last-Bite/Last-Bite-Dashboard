"use client";

import { useState } from "react";
import { fetchRecipeIdeas } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Recipe {
  name: string;
  ingredients: string[];
  steps: string[];
  estimated_time_minutes: number;
  required_tools: string[];
}

interface ApiResponse {
  recipes: Recipe[];
}

// ─── Demo data (fallback during dev) ─────────────────────────────────────────

const DEMO_DATA: ApiResponse = {
  recipes: [
    {
      name: "The 3am Pizza Crouton Salad",
      ingredients: ["pizza", "salad", "strawberry"],
      steps: [
        "Toast the pizza slice in the toaster until the crust is extra crunchy and firm.",
        "Use a knife to cut the pizza slice into small bite-sized cubes.",
        "Toss the pizza cubes into a bowl of fresh salad greens.",
        "Slice strawberries and toss them on top for a sweet and savory flavor contrast.",
      ],
      estimated_time_minutes: 5,
      required_tools: ["toaster", "knife", "bowl"],
    },
    {
      name: "Leftover Fried Rice Breakfast Bowl",
      ingredients: ["fried rice", "egg", "soy sauce", "green onion"],
      steps: [
        "Reheat fried rice in a skillet over medium heat until warm and slightly crispy.",
        "Fry an egg sunny-side up in a separate pan.",
        "Place egg on top of rice, drizzle soy sauce, garnish with green onion.",
      ],
      estimated_time_minutes: 8,
      required_tools: ["skillet", "spatula", "pan"],
    },
    {
      name: "Banana Bread French Toast",
      ingredients: ["banana bread", "eggs", "milk", "cinnamon", "butter"],
      steps: [
        "Whisk eggs, milk, and cinnamon together in a wide bowl.",
        "Dip thick slices of banana bread into the egg mixture.",
        "Cook in buttered skillet over medium heat, 2 minutes per side.",
        "Serve with maple syrup or fresh fruit compote.",
      ],
      estimated_time_minutes: 12,
      required_tools: ["bowl", "whisk", "skillet", "spatula"],
    },
  ],
};

// ─── Emoji decoration ─────────────────────────────────────────────────────────

const EMOJIS = ["🍕", "🥗", "🍳", "🥘", "🍜", "🥙", "🍱", "🥞", "🫕", "🌮"];

// ─── Recipe Card ──────────────────────────────────────────────────────────────

function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  const [open, setOpen] = useState(false);
  const emoji = EMOJIS[index % EMOJIS.length];
  const isEven = index % 2 === 0;

  return (
    <article
      className="recipe-card"
      style={
        {
          "--stripe-color": isEven ? "var(--primary)" : "var(--accent)",
          animationDelay: `${index * 0.07}s`,
        } as React.CSSProperties
      }
    >
      <div className="card-stripe" />

      <div className="card-body">
        {/* Header */}
        <div className="card-header">
          <span className="card-emoji" role="img" aria-label="food">
            {emoji}
          </span>
          <div className="card-title-group">
            <h2 className="card-title">{recipe.name}</h2>
            <div className="meta-row">
              <span className="badge badge-time">
                ⏱ {recipe.estimated_time_minutes} min
              </span>
              {recipe.required_tools.slice(0, 2).map((t) => (
                <span key={t} className="badge badge-tool">
                  {t}
                </span>
              ))}
              {recipe.required_tools.length > 2 && (
                <span className="badge badge-tool">
                  +{recipe.required_tools.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Ingredient chips */}
        <div className="chip-row">
          {recipe.ingredients.map((ing) => (
            <span key={ing} className="chip">
              {ing}
            </span>
          ))}
        </div>

        {/* Steps toggle */}
        <button
          className="steps-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Hide steps ▲" : "Show steps ▼"}
        </button>

        {open && (
          <ol className="steps-list">
            {recipe.steps.map((step, i) => (
              <li key={i} className="step-item">
                <span className="step-num">{i + 1}</span>
                <p className="step-text">{step}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </article>
  );
}

// ─── Client Component ─────────────────────────────────────────────────────────

export default function RecipeIdeas() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [usedDemo, setUsedDemo] = useState(false);

  const load = async () => {
    setLoading(true);
    setData(null);
    setUsedDemo(false);
    try {
      const result = await fetchRecipeIdeas();
      setData(result);
    } catch {
      setData(DEMO_DATA);
      setUsedDemo(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="ideas-root">
        <div className="blob blob-1" aria-hidden="true" />
        <div className="blob blob-2" aria-hidden="true" />

        {/* Header */}
        <header className="page-header">
          <span className="eyebrow">✦ DINING HALL IDEA GENERATOR</span>
          <h1 className="page-title">
            Today's Wild
            <br />
            Creations
          </h1>
          <p className="page-sub">
            Playful mashups from what's already in stock — spark your next menu
            adventure and delight your diners.
          </p>
        </header>

        {/* Generate button */}
        <button
          className={`generate-btn${loading ? " loading" : ""}`}
          onClick={load}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner" aria-label="Loading" />
          ) : data ? (
            "✨ Regenerate Ideas"
          ) : (
            "✨ Generate Ideas"
          )}
        </button>

        {/* Demo notice */}
        {usedDemo && (
          <div className="demo-notice" role="status">
            📡 Showing demo data — connect your API to see live results.
          </div>
        )}

        {/* Cards */}
        {data && (
          <div className="cards-grid">
            {data.recipes.map((recipe, i) => (
              <RecipeCard key={recipe.name + i} recipe={recipe} index={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!data && !loading && (
          <div className="empty-state">
            <span className="empty-emoji">🥄</span>
            <h2 className="empty-title">Nothing cooking yet!</h2>
            <p className="empty-text">
              Hit "Generate Ideas" and we'll whip up creative combos from
              whatever's in the dining hall today.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Scoped styles ────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

  .ideas-root {
    position: relative;
    width: 100%;
    font-family: 'DM Sans', sans-serif;
    color: var(--foreground, #263238);
  }

  .blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.18;
    pointer-events: none;
    z-index: 0;
  }
  .blob-1 { width: 520px; height: 520px; background: var(--secondary, #66BB6A); top: -160px; right: -120px; }
  .blob-2 { width: 380px; height: 380px; background: var(--accent, #FFB300); bottom: -100px; left: -100px; }

  .page-header {
    margin-bottom: 36px;
    position: relative;
    z-index: 1;
    animation: fadeUp 0.5s ease both;
  }
  .eyebrow {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    color: var(--primary, #1B5E20);
    background: var(--muted, #E8F5E9);
    border: 1px solid var(--border, #C8E6C9);
    border-radius: 4px;
    padding: 4px 10px;
    margin-bottom: 14px;
  }
  .page-title {
    font-family: 'Lora', Georgia, serif;
    font-size: clamp(36px, 6vw, 58px);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -1.5px;
    color: var(--foreground, #263238);
    margin: 0 0 14px;
  }
  .page-sub {
    font-size: 16px;
    color: var(--muted-foreground, #546E7A);
    line-height: 1.65;
    max-width: 460px;
    margin: 0;
  }

  .generate-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    background: var(--primary, #1B5E20);
    color: #fff;
    border: none;
    border-radius: 14px;
    padding: 15px 34px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    margin-bottom: 20px;
    min-width: 210px;
    min-height: 52px;
    box-shadow: 0 8px 24px rgba(27,94,32,0.28);
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s;
    animation: fadeUp 0.5s 0.1s ease both;
  }
  .generate-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(27,94,32,0.35); background: #2E7D32; }
  .generate-btn:active:not(:disabled) { transform: translateY(0); }
  .generate-btn:disabled { opacity: 0.75; cursor: not-allowed; }

  .spinner {
    display: inline-block;
    width: 20px; height: 20px;
    border: 3px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  .demo-notice {
    background: #FFF8E1;
    border: 1px solid #FFE082;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    color: #5D4037;
    margin-bottom: 24px;
    line-height: 1.5;
    position: relative;
    z-index: 1;
    animation: fadeUp 0.3s ease both;
  }

  .cards-grid {
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: relative;
    z-index: 1;
  }

  .recipe-card {
    background: var(--card, #ffffff);
    border: 1px solid var(--border, #C8E6C9);
    border-radius: 20px;
    display: flex;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    animation: fadeUp 0.45s ease both;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }
  .recipe-card:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(0,0,0,0.1); }

  .card-stripe { width: 7px; flex-shrink: 0; background: var(--stripe-color, var(--primary, #1B5E20)); }
  .card-body { padding: 22px; flex: 1; }

  .card-header { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 14px; }
  .card-emoji { font-size: 34px; line-height: 1; flex-shrink: 0; }
  .card-title-group { flex: 1; min-width: 0; }
  .card-title {
    font-family: 'Lora', Georgia, serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--foreground, #263238);
    margin: 0 0 8px;
    line-height: 1.3;
  }

  .meta-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
  .badge { border-radius: 8px; padding: 3px 9px; font-size: 12px; font-weight: 600; line-height: 1.4; }
  .badge-time { background: var(--muted, #E8F5E9); color: var(--primary, #1B5E20); }
  .badge-tool { background: #FFF8E1; color: #795548; border: 1px solid #FFE082; }

  .chip-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
  .chip {
    background: rgba(102,187,106,0.12);
    border: 1px solid rgba(102,187,106,0.4);
    border-radius: 20px;
    padding: 5px 13px;
    font-size: 13px;
    font-weight: 600;
    color: var(--primary, #1B5E20);
  }

  .steps-toggle {
    background: none; border: none; padding: 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--secondary, #66BB6A);
    cursor: pointer;
    transition: color 0.15s;
  }
  .steps-toggle:hover { color: var(--primary, #1B5E20); }

  .steps-list { list-style: none; margin: 14px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px; animation: fadeUp 0.25s ease both; }
  .step-item { display: flex; gap: 12px; align-items: flex-start; }
  .step-num {
    flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%;
    background: var(--primary, #1B5E20); color: #fff;
    font-size: 11px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; margin-top: 1px;
  }
  .step-text { font-size: 14px; color: var(--foreground, #263238); line-height: 1.6; margin: 0; }

  .empty-state { text-align: center; padding: 72px 24px 40px; position: relative; z-index: 1; animation: fadeUp 0.5s 0.15s ease both; }
  .empty-emoji { display: block; font-size: 60px; margin-bottom: 18px; }
  .empty-title { font-family: 'Lora', Georgia, serif; font-size: 24px; font-weight: 600; color: var(--foreground, #263238); margin: 0 0 10px; }
  .empty-text { font-size: 15px; color: var(--muted-foreground, #546E7A); line-height: 1.65; max-width: 360px; margin: 0 auto; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
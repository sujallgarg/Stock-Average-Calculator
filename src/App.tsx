import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Single-file React component for a Stock Average Calculator (Tailwind-ready)
export default function StockAverageCalculator() {
  const [input, setInput] = useState("");
  const [prices, setPrices] = useState([]);
  const [ticker, setTicker] = useState("");
  const [average, setAverage] = useState(null);
  const [error, setError] = useState("");

  // Purchases: support N rows (array of { units, price })
  const [purchases, setPurchases] = useState([{ units: "", price: "" }]);
  const [weightedAverage, setWeightedAverage] = useState(null);
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  function parsePricesFromText(text) {
    const tokens = text
      .split(/[\n,;]+/)
      .map((t) => t.trim())
      .filter(Boolean);
    const result = [];
    for (const tok of tokens) {
      const pair = tok.includes(":") ? tok.split(":") : tok.split(/\s+/);
      const maybePrice = pair.length > 1 ? pair[pair.length - 1] : pair[0];
      const num = parseFloat(maybePrice.replace(/[^0-9.+-Ee]/g, ""));
      if (!isNaN(num)) result.push(num);
    }
    return result;
  }

  function calculateAverage(arr) {
    if (!arr || arr.length === 0) return null;
    const sum = arr.reduce((s, v) => s + v, 0);
    return sum / arr.length;
  }

  function handleComputeFromInput() {
    setError("");
    const parsed = parsePricesFromText(input);
    if (parsed.length === 0) {
      setError("No valid numeric prices found. Enter comma/newline separated numbers or date:price lines.");
      setPrices([]);
      setAverage(null);
      return;
    }
    setPrices(parsed.map((p, i) => ({ index: i + 1, price: p })));
    const avg = calculateAverage(parsed);
    setAverage(avg);
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const parsed = parsePricesFromText(text);
      if (parsed.length === 0) {
        setError("Uploaded file contained no valid numeric prices.");
        setPrices([]);
        setAverage(null);
        return;
      }
      setPrices(parsed.map((p, i) => ({ index: i + 1, price: p })));
      setAverage(calculateAverage(parsed));
      setInput(text);
      setError("");
    };
    reader.readAsText(file);
  }

  function handleClear() {
    setInput("");
    setPrices([]);
    setAverage(null);
    setTicker("");
    setError("");
  }

  function fmt(num) {
    if (num === null || num === undefined) return "—";
    return Number(num).toLocaleString(undefined, { maximumFractionDigits: 4 });
  }

  return (
    <>
      <Helmet>
        <title>Stock Average Calculator | Stock Average Pro</title>
        <meta name="description" content="Calculate weighted stock averages, track purchase entries, and analyze price trends with our advanced Stock Average Calculator. Fast, private, and easy to use." />
        <meta name="keywords" content="stock average calculator, weighted average stock, share calculator, investment tools, finance calculator, portfolio calculator" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Stock Average Calculator | Stock Average Pro" />
        <meta property="og:description" content="Easily calculate stock averages using multiple purchase entries with visual charts and exportable data." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Stock Average Pro" />
        <meta property="og:url" content="https://example.com/" />
        <meta property="og:image" content="/background.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourhandle" />
        <meta name="twitter:title" content="Stock Average Calculator | Stock Average Pro" />
        <meta name="twitter:description" content="Calculate weighted stock averages, track purchases and visualize price trends." />
        <meta name="twitter:image" content="/background.png" />

        {/* Canonical — replace with your real site URL when deploying */}
        <link rel="canonical" href="https://example.com/" />

        <meta name="theme-color" content="#0a0a0f" />

        {/* Structured Data (JSON-LD) for SEO */}
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Stock Average Pro",
          "url": "https://example.com/",
          "description": "A tool to calculate weighted stock averages from multiple purchase entries and visualize price trends.",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "screenshot": ["https://example.com/background.png"]
        }`}</script>

        {/* Local business/organization schema (optional) */}
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Stock Average Pro",
          "url": "https://example.com/",
          "logo": "https://example.com/favicon.ico"
        }`}</script>

        {/* Note: Update og:url, canonical, and screenshot URLs to your production domain before deploying. */}
      </Helmet>

      <div className="min-h-screen text-slate-100 bg-[#0d1218]">
        {/* Header */}
        <div className="w-full bg-[#0d1218] backdrop-blur-lg py-4 mb-6 border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
            {/* <h1 className="text-xl font-semibold text-white tracking-wide">📈 Stock Average Pro</h1> */}
            <img src="/Stock Average Pro Logo Design.png" alt="Stock Average Pro" className="w-25 h-15 cursor-pointer" url="https://localhost:5173/" />
            <nav className="flex gap-6 text-slate-300 text-sm">
              <a className="hover:text-white cursor-pointer">Home</a>
              <a className="hover:text-white cursor-pointer">Calculator</a>
              <a className="hover:text-white cursor-pointer">About</a>
            </nav>
          </div>
        </div>
{/* bg-slate-900/80 */}
        {/* Main card */}
        <div className="flex items-start justify-center p-6">
          <div className="max-w-4xl w-full bg-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
            <header className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Stock Average Calculator</h2>

              </div>
              <div className="text-right">
                <div className="text-sm text-slate-300">Items:</div>
                <div className="text-lg font-mono">{prices.length}</div>
              </div>
            </header>

            <main className="grid md:grid-cols-2 gap-6">
              {/* Purchases form supporting N rows */}
              <section className="col-span-2">
                <div className="bg-slate-800 rounded-xl p-5 border">
                  <h3 className="text-xl font-semibold mb-4">Purchases</h3>

                  <div className="space-y-4">
                    {purchases.map((row, idx) => (
                      <div key={idx} className="grid md:grid-cols-3 gap-3 items-end">
                        <div>
                          <label className="text-sm text-slate-400">Units</label>
                          <input type="number" value={row.units} onChange={(e)=>{
                            const copy = [...purchases]; copy[idx] = { ...copy[idx], units: e.target.value }; setPurchases(copy);
                          }} className="w-full rounded-md p-2 mt-1 border border-slate-700 bg-slate-800" />
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Price per share</label>
                          <input type="number" value={row.price} onChange={(e)=>{
                            const copy = [...purchases]; copy[idx] = { ...copy[idx], price: e.target.value }; setPurchases(copy);
                          }} className="w-full rounded-md p-2 mt-1 border border-slate-700 bg-slate-800" />
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-2 rounded-md bg-slate-700 text-slate-200 border border-slate-600" onClick={()=>{
                            const copy = purchases.filter((_,i)=>i!==idx); setPurchases(copy.length?copy:[{units:'',price:''}]);
                          }}>Remove</button>
                          {idx === purchases.length -1 && (
                            <button className="px-3 py-2 rounded-md bg-indigo-600 text-white" onClick={()=>{ setPurchases([...purchases, { units: '', price: '' }]); }}>Add row</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-5">
                    <button className="px-5 py-2 rounded-lg bg-yellow-400 text-slate-900 font-medium" onClick={() => {
                      setPurchases([{ units: "", price: "" }]);
                      setWeightedAverage(null); setTotalUnits(0); setTotalCost(0); setPrices([]); setAverage(null);
                    }}>Clear Fields</button>

                    <button className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium" onClick={() => {
                      let totalU = 0; let totalC = 0;
                      for (const r of purchases) {
                        const u = parseFloat(r.units) || 0;
                        const p = parseFloat(r.price) || 0;
                        totalU += u;
                        totalC += u * p;
                      }
                      if (totalU === 0) { setWeightedAverage(null); setError('Please enter units for at least one purchase.'); return; }
                      setError('');
                      const avg = totalC / totalU;
                      setTotalUnits(totalU); setTotalCost(totalC); setWeightedAverage(avg);
                      setAverage(avg);
                      const parsed = purchases.filter(r=> (parseFloat(r.units)||0) > 0).map(r => parseFloat(r.price)||0);
                      setPrices(parsed.map((p,i)=>({index:i+1, price:p})));
                    }}>Calculate Average</button>
                  </div>

                  <div className="mt-4 grid md:grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg bg-slate-700">
                      <div className="text-sm text-slate-400">Total Units</div>
                      <div className="text-xl font-semibold">{totalUnits}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-700">
                      <div className="text-sm text-slate-400">Total Cost</div>
                      <div className="text-xl font-semibold">{totalCost ? Number(totalCost).toLocaleString(undefined,{maximumFractionDigits:2}) : '—'}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-700">
                      <div className="text-sm text-slate-400">Weighted Average Price</div>
                      <div className="text-xl font-semibold">{weightedAverage !== null ? Number(weightedAverage).toLocaleString(undefined,{maximumFractionDigits:4}) : '—'}</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Chart / parsed list section */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <label className="text-sm text-slate-300">Ticker (optional)</label>
                    <div className="text-lg font-medium">{ticker || "—"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-300">Average</div>
                    <div className="text-xl font-mono">{average !== null ? fmt(average) : "—"}</div>
                  </div>
                </div>

                <div className="h-64 bg-slate-700/60 rounded-xl p-3">
                  {prices.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-400">No price data to chart — use the calculator above to see a chart.</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={prices.map((p) => ({ name: p.index, price: p.price }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={["dataMin", "dataMax"]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={{ r: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>

                <div className="mt-4 max-h-44 overflow-auto rounded-lg bg-slate-700/40 p-3">
                  <div className="text-sm text-slate-300 mb-2">Parsed prices (first 200 shown)</div>
                  <ol className="list-decimal pl-5 text-xs text-slate-200">
                    {prices.slice(0, 200).map((p) => (
                      <li key={p.index} className="leading-6">{fmt(p.price)}</li>
                    ))}
                  </ol>
                </div>
              </section>
            </main>

          </div>
        </div>
      </div>
    </>
  );
}

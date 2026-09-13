import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
type Row = { label: string; value: number | null };
const colors = ["#000091", "#6979d5", "#e8a33e", "#849ba3"];
const fmt = (n: number | null, d = 0): string =>
 n === null ? "Non disponible" : n.toLocaleString("fr-FR", { maximumFractionDigits: d, minimumFractionDigits: d });
export default function Donut({ data, label }: { data: Row[]; label: string }) {
 const valid = data.length > 0 && data.every(r => r.value !== null && r.value >= 0) && Math.abs(data.reduce((s, r) => s + (r.value ?? 0), 0) - 100) < 0.6;
 return <div className="donut-block">
  <h3>{label}</h3>
  <div className="donut-layout">
   <div className="donut" role="img" aria-label={data.map(r => `${r.label} : ${fmt(r.value, 1)} %`).join(" ; ")}>
    {valid
     ? <ResponsiveContainer width="100%" height="100%">
        <PieChart>
         <Pie data={data} dataKey="value" innerRadius="65%" outerRadius="94%" startAngle={90} endAngle={-270} stroke="#fff" strokeWidth={3} animationDuration={450}>
          {data.map((r, i) => <Cell key={r.label} fill={colors[i % colors.length]} />)}
         </Pie>
        </PieChart>
       </ResponsiveContainer>
     : <div className="empty-ring" />}
    <span className="ring-label">{valid ? "100 %" : "—"}<small>{valid ? "répartition" : "indisponible"}</small></span>
   </div>
   <ul className="donut-legend">
    {data.map((r, i) => <li key={r.label}><i style={{ background: colors[i % colors.length] }} /><span>{r.label}</span><b>{fmt(r.value, 1)}{r.value !== null ? " %" : ""}</b></li>)}
   </ul>
  </div>
 </div>;
}

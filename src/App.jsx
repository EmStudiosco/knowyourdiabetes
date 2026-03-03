import React, { useState } from 'react'

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Carlito:wght@400;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { font-family: 'Carlito','Calibri','Segoe UI',sans-serif; font-size: 12px; background: #F1F5F9; }
    h1, h2 { font-size: 20px !important; font-weight: 700; }
    h3 { font-size: 16px !important; font-weight: 700; }
    .card { background:#fff; border-radius:18px; box-shadow:0 3px 16px rgba(0,0,0,.10); cursor:pointer; transition:transform .18s,box-shadow .18s; overflow:hidden; }
    .card:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(0,0,0,.15); }
    .card:active { transform:scale(.97); }
    .pill { display:inline-block; padding:2px 10px; border-radius:20px; font-size:11px; font-weight:700; }
    .back-btn { background:rgba(255,255,255,.22); border:1.5px solid rgba(255,255,255,.5); color:#fff; padding:6px 16px; border-radius:20px; cursor:pointer; font-family:'Carlito','Calibri',sans-serif; font-size:12px; font-weight:700; }
    .tip-box { margin-top:14px; padding:10px 14px; background:linear-gradient(135deg,#FFF8DC,#FFFACD); border-radius:10px; font-size:12px; border-left:4px solid #F5C518; line-height:1.6; }
    .img-hero { width:100%; height:165px; object-fit:cover; border-radius:14px; margin-bottom:14px; display:block; }
    .toggle-btn { flex:1; padding:9px 0; border-radius:22px; border:none; cursor:pointer; font-family:'Carlito','Calibri',sans-serif; font-size:12px; font-weight:700; transition:all .2s; }
    .step-num { min-width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:#fff; flex-shrink:0; }
    .chip { display:flex; align-items:center; gap:7px; padding:9px 11px; border-radius:12px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,.07); font-size:12px; line-height:1.3; }
    .infocard { margin-bottom:10px; padding:13px 14px; border-radius:13px; background:#fff; box-shadow:0 2px 10px rgba(0,0,0,.07); }
    .nav-btn { border:none; border-radius:20px; padding:5px 14px; font-size:12px; font-weight:600; cursor:pointer; font-family:'Carlito','Calibri',sans-serif; }
    .scroll-area { padding:16px 16px 90px; }
    .target-row { display:flex; justify-content:space-between; align-items:center; padding:9px 12px; border-radius:10px; font-size:12px; margin-bottom:6px; }
  `}</style>
)

const COLORS = {
  what:       { main:'#2563EB', light:'#EFF6FF', accent:'#1D4ED8' },
  symptoms:   { main:'#DC2626', light:'#FEF2F2', accent:'#B91C1C' },
  diet:       { main:'#16A34A', light:'#F0FDF4', accent:'#15803D' },
  lifestyle:  { main:'#7C3AED', light:'#F5F3FF', accent:'#6D28D9' },
  meds:       { main:'#0369A1', light:'#F0F9FF', accent:'#075985' },
  monitoring: { main:'#D97706', light:'#FFFBEB', accent:'#B45309' },
  risks:      { main:'#9333EA', light:'#FAF5FF', accent:'#7E22CE' },
  help:       { main:'#C2410C', light:'#FFF7ED', accent:'#9A3412' },
}

const IMGS = {
  what:       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Diabetes_self_test.jpg/320px-Diabetes_self_test.jpg',
  monitoring: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Finger-stick_blood_sugar_test_lancet.jpg/320px-Finger-stick_blood_sugar_test_lancet.jpg',
  diet:       'https://images.kaiserpermanente.org/is/image/kp/healthy-plate-image?wid=600',
  lifestyle:  'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80',
  meds:       'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Metformin_tablets.jpg/320px-Metformin_tablets.jpg',
  complications: 'https://www.cdc.gov/diabetes/images/library/features/diabetes-heart-disease-ckd-triangle-1200x675.jpg',
  emergency:  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ambulance_KTM_Nepal.jpg/320px-Ambulance_KTM_Nepal.jpg',
}

const sections = [
  {
    id:'what', emoji:'🩺', title:'What is Diabetes?', subtitle:'Understanding your condition',
    content:{
      summary:'Diabetes is when your body cannot manage blood sugar (glucose) properly. Think of insulin as a key that unlocks your cells to let sugar in for energy. In diabetes, the key is missing or the locks are broken.',
      types:[
        { name:'Type 1', badge:'Autoimmune', color:'#DC2626', desc:'Your immune system destroys insulin-producing cells. You need insulin injections every day. Often starts in childhood or young adulthood.' },
        { name:'Type 2', badge:'Most Common', color:'#2563EB', desc:'Your body does not use insulin well. Affects 90% of cases. Often linked to lifestyle — but genetics play a role too.' },
        { name:'Gestational', badge:'Pregnancy', color:'#16A34A', desc:'Develops during pregnancy. Usually goes away after birth, but increases your future risk of Type 2 diabetes.' },
      ],
      tip:'Normal fasting blood sugar in Canada: 4.0–7.0 mmol/L. (Diabetes Canada, 2023)'
    }
  },
  {
    id:'symptoms', emoji:'⚠️', title:'Warning Signs', subtitle:'Know what to watch for',
    content:{
      summary:'Symptoms can develop slowly in Type 2 or appear suddenly in Type 1. Many people have Type 2 diabetes for years without knowing it.',
      symptoms:[
        { icon:'💧', label:'Extreme thirst' },
        { icon:'🚽', label:'Frequent urination' },
        { icon:'😴', label:'Unusual fatigue' },
        { icon:'👁️', label:'Blurry vision' },
        { icon:'🩹', label:'Slow-healing wounds' },
        { icon:'🔥', label:'Tingling in feet or hands' },
        { icon:'⚖️', label:'Unexplained weight loss' },
        { icon:'🍽️', label:'Always feeling hungry' },
      ],
      tip:'If you have 2 or more of these symptoms, see your doctor for a blood sugar test right away.'
    }
  },
  {
    id:'diet', emoji:'🥗', title:'Eating Right', subtitle:'Fuel your body wisely',
    content:{
      summary:'You do not need a special diabetic diet. You just need balanced, whole-food eating. Small daily changes add up to big results over time.',
      eat:['Non-starchy vegetables (broccoli, spinach, carrots)','Whole grains (brown rice, oats, whole wheat bread)','Lean proteins (fish, chicken, lentils, beans)','Healthy fats (avocado, olive oil, unsalted nuts)','Low-fat dairy or plant-based alternatives','Water — at least 8 glasses a day'],
      avoid:['Sugary drinks (pop, juice, energy drinks)','White bread, white rice, white pasta','Fried and fast food','High-sugar desserts and candy','Processed packaged snacks'],
      tip:'Plate Method: fill half your plate with veggies, one quarter with protein, one quarter with whole grains. (Diabetes Canada, 2023)'
    }
  },
  {
    id:'lifestyle', emoji:'🏃', title:'Lifestyle Changes', subtitle:'Your daily habits matter',
    content:{
      summary:'For Type 2 diabetes, lifestyle changes can be just as powerful as medication. Even small improvements make a measurable difference in your blood sugar.',
      changes:[
        { icon:'🏋️', label:'Exercise 150 min/week',   detail:'30-minute daily walks lower blood sugar. Break it into 3 x 10 min if needed — it still counts.' },
        { icon:'🚭', label:'Quit smoking',             detail:'Smoking doubles your diabetes complication risk. Ask your doctor about free quit-smoking programs in Canada.' },
        { icon:'🍷', label:'Limit alcohol',            detail:'Alcohol causes blood sugar swings. Stick to 1–2 drinks max and always eat food with it.' },
        { icon:'😴', label:'Sleep 7–9 hours',          detail:'Poor sleep raises blood sugar and increases hunger hormones. Quality sleep is medicine.' },
        { icon:'🧘', label:'Manage stress',            detail:'Stress hormones spike blood sugar. Try deep breathing, gentle walks, or talking to someone you trust.' },
        { icon:'⚖️', label:'Manage your weight',      detail:'Losing just 5–10% of body weight can dramatically improve blood sugar control in Type 2.' },
      ],
      tip:'A 10-minute walk after meals is one of the most effective tools for lowering blood sugar.'
    }
  },
  {
    id:'meds', emoji:'💊', title:'Medications', subtitle:'Your treatment options',
    content:{
      summary:'Medication helps when lifestyle changes are not enough — or in combination with them. Never stop or change your medication without your doctor\'s guidance.',
      meds:[
        { name:'Metformin',          type:'Pill',      color:'#2563EB', desc:'Usually the first medication for Type 2. Reduces sugar production in the liver. Very well-studied and safe.' },
        { name:'Insulin',            type:'Injection', color:'#DC2626', desc:'Essential for Type 1. Sometimes needed in Type 2. Comes in fast-acting (before meals) and long-acting (once daily) forms.' },
        { name:'SGLT2 Inhibitors',   type:'Pill',      color:'#16A34A', desc:'Help kidneys remove excess sugar through urine. Examples: Jardiance, Forxiga. Also protect the heart and kidneys.' },
        { name:'GLP-1 Agonists',     type:'Injection', color:'#9333EA', desc:'Lower blood sugar AND help with weight loss. Examples: Ozempic, Victoza. Taken weekly or daily.' },
      ],
      tip:'Take medication at the same time every day. Set a phone reminder. Missed doses cause blood sugar spikes.'
    }
  },
  {
    id:'monitoring', emoji:'📊', title:'Blood Sugar Monitoring', subtitle:'Know your numbers',
    content:{
      summary:'Regular monitoring shows how food, exercise, stress, and medication affect your blood sugar. Everyone\'s body responds differently.',
      howto:[
        'Wash and dry your hands thoroughly',
        'Insert a test strip into your glucose meter',
        'Use the lancet to prick the side of your fingertip',
        'Gently squeeze out a small drop of blood',
        'Touch the strip to the blood drop and wait for the reading',
        'Record the result in a logbook or diabetes tracking app',
      ],
      targets:[
        { time:'Before meals (fasting)', range:'4.0 – 7.0 mmol/L' },
        { time:'2 hours after meals',    range:'5.0 – 10.0 mmol/L' },
        { time:'A1C (3-month average)',  range:'Below 7.0%' },
      ],
      tip:'How often to test varies by person and medication. Ask your care team what is right for you.'
    }
  },
  {
    id:'risks', emoji:'🔬', title:'Risks and Complications', subtitle:'Prevention starts with knowledge',
    content:{
      summary:'Understanding your risks helps you take action before complications develop. Good blood sugar control prevents most complications.',
      risks:[
        'Family history of diabetes',
        'Overweight or obesity, especially belly fat',
        'Age 45 or older',
        'Physically inactive lifestyle',
        'High blood pressure or high cholesterol',
        'History of gestational diabetes',
        'Indigenous, South Asian, or African heritage (higher genetic risk in Canada)',
      ],
      complications:[
        { icon:'👁️', label:'Vision loss (retinopathy)' },
        { icon:'🦶', label:'Nerve damage and foot problems' },
        { icon:'🫀', label:'Heart disease and stroke' },
        { icon:'🫘', label:'Kidney disease (nephropathy)' },
        { icon:'🦵', label:'Amputation risk' },
        { icon:'🧠', label:'Increased dementia risk' },
      ],
      tip:'Keeping A1C below 7% can reduce complication risk by up to 75%. (Diabetes Canada, 2023)'
    }
  },
  {
    id:'help', emoji:'🚨', title:'When to Get Help', subtitle:'Act fast — know the signs',
    content:{
      summary:'Knowing when to act fast can save your life or someone else\'s. Do not wait to see if symptoms go away on their own.',
      emergency:[
        'Blood sugar below 3.9 mmol/L with shaking, sweating, or confusion (hypoglycemia)',
        'Blood sugar above 16.7 mmol/L with nausea, vomiting, or fruity breath (DKA)',
        'Chest pain, difficulty breathing, or pain in jaw or arm',
        'Loss of consciousness or unresponsiveness',
        'Sudden severe confusion or seizure',
      ],
      callDoctor:[
        'Blood sugar consistently outside your target range',
        'New or worsening sores on your feet',
        'Sudden changes in your vision',
        'Swelling in your legs or ankles',
        'Signs of infection: redness, warmth, pus, or fever',
      ],
      resources:[
        { label:'Diabetes Canada Helpline', value:'1-800-BANTING (226-8464)' },
        { label:'Health811 (ON, AB, BC, SK)', value:'Dial 8-1-1 — free 24/7 nurse line' },
        { label:'Diabetes Canada', value:'diabetes.ca' },
        { label:'Health Canada', value:'canada.ca/health' },
      ],
      tip:'Call 911 immediately if someone with diabetes is unconscious or not responding.'
    }
  },
]

function WhatSection({ sec }) {
  const c = COLORS[sec.id]
  return (
    <div>
      <img src={IMGS.what} alt="diabetes test" className="img-hero" onError={e => e.target.style.display='none'} />
      <p style={{ lineHeight:1.7, marginBottom:14 }}>{sec.content.summary}</p>
      {sec.content.types.map((t, i) => (
        <div key={i} className="infocard" style={{ borderLeft:`4px solid ${t.color}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
            <strong style={{ fontSize:14, color:t.color }}>{t.name}</strong>
            <span className="pill" style={{ background:c.light, color:t.color }}>{t.badge}</span>
          </div>
          <p style={{ color:'#444', lineHeight:1.6 }}>{t.desc}</p>
        </div>
      ))}
      <div className="tip-box">💡 {sec.content.tip}</div>
    </div>
  )
}

function SymptomsSection({ sec }) {
  return (
    <div>
      <p style={{ lineHeight:1.7, marginBottom:14 }}>{sec.content.summary}</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
        {sec.content.symptoms.map((s, i) => (
          <div key={i} className="chip">
            <span style={{ fontSize:22 }}>{s.icon}</span><span>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="tip-box">💡 {sec.content.tip}</div>
    </div>
  )
}

function DietSection({ sec }) {
  const [tab, setTab] = useState('eat')
  return (
    <div>
      <div style={{ borderRadius:14, overflow:'hidden', marginBottom:14, height:160, position:'relative' }}>
        <img src={IMGS.diet} alt="healthy plate" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => e.target.parentElement.style.display='none'} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'8px 12px', background:'linear-gradient(transparent,rgba(0,0,0,0.65))', color:'#fff', fontSize:11 }}>
          The Plate Method — half veggies, quarter protein, quarter whole grains
        </div>
      </div>
      <p style={{ lineHeight:1.7, marginBottom:12 }}>{sec.content.summary}</p>
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        {['eat','avoid'].map(t => (
          <button key={t} className="toggle-btn" onClick={() => setTab(t)}
            style={{ background: tab===t ? (t==='eat' ? '#16A34A' : '#DC2626') : '#F1F5F9', color: tab===t ? '#fff' : '#64748B' }}>
            {t==='eat' ? '✅ Eat More' : '⛔ Limit These'}
          </button>
        ))}
      </div>
      {(tab==='eat' ? sec.content.eat : sec.content.avoid).map((item, i) => (
        <div key={i} style={{ padding:'8px 12px', marginBottom:6, borderRadius:10, background: tab==='eat' ? '#F0FDF4' : '#FEF2F2', display:'flex', gap:8, alignItems:'flex-start' }}>
          <span>{tab==='eat' ? '✅' : '⛔'}</span><span style={{ lineHeight:1.5 }}>{item}</span>
        </div>
      ))}
      <div className="tip-box">💡 {sec.content.tip}</div>
    </div>
  )
}

function LifestyleSection({ sec }) {
  const c = COLORS[sec.id]
  return (
    <div>
      <img src={IMGS.lifestyle} alt="exercise" className="img-hero" onError={e => e.target.style.display='none'} />
      <p style={{ lineHeight:1.7, marginBottom:14 }}>{sec.content.summary}</p>
      {sec.content.changes.map((ch, i) => (
        <div key={i} className="infocard" style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
          <span style={{ fontSize:26, lineHeight:1, marginTop:2 }}>{ch.icon}</span>
          <div>
            <strong style={{ fontSize:14, color:c.main, display:'block', marginBottom:3 }}>{ch.label}</strong>
            <p style={{ color:'#555', lineHeight:1.6 }}>{ch.detail}</p>
          </div>
        </div>
      ))}
      <div className="tip-box">💡 {sec.content.tip}</div>
    </div>
  )
}

function MedsSection({ sec }) {
  return (
    <div>
      <img src={IMGS.meds} alt="medication tablets" className="img-hero" onError={e => e.target.style.display='none'} />
      <p style={{ lineHeight:1.7, marginBottom:14 }}>{sec.content.summary}</p>
      {sec.content.meds.map((med, i) => (
        <div key={i} className="infocard">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
            <strong style={{ fontSize:14, color:med.color }}>{med.name}</strong>
            <span className="pill" style={{ background: med.type==='Pill' ? '#EFF6FF' : '#FEF2F2', color: med.type==='Pill' ? '#2563EB' : '#DC2626' }}>
              {med.type==='Pill' ? '💊 Pill' : '💉 Injection'}
            </span>
          </div>
          <p style={{ color:'#444', lineHeight:1.6 }}>{med.desc}</p>
        </div>
      ))}
      <div className="tip-box">💡 {sec.content.tip}</div>
    </div>
  )
}

function MonitoringSection({ sec }) {
  const c = COLORS[sec.id]
  return (
    <div>
      <img src={IMGS.monitoring} alt="blood glucose test" className="img-hero" onError={e => e.target.style.display='none'} />
      <p style={{ lineHeight:1.7, marginBottom:14 }}>{sec.content.summary}</p>
      <h3 style={{ marginBottom:10, color:c.main }}>How to Test Step by Step</h3>
      {sec.content.howto.map((step, i) => (
        <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:9 }}>
          <span className="step-num" style={{ background:c.main }}>{i+1}</span>
          <span style={{ lineHeight:1.6, paddingTop:3 }}>{step}</span>
        </div>
      ))}
      <h3 style={{ margin:'16px 0 8px', color:c.main }}>Canadian Target Ranges</h3>
      {sec.content.targets.map((t, i) => (
        <div key={i} className="target-row" style={{ background: i%2===0 ? '#FFFBEB' : '#FEF9EC' }}>
          <span>{t.time}</span>
          <strong style={{ color:c.main }}>{t.range}</strong>
        </div>
      ))}
      <div className="tip-box">💡 {sec.content.tip}</div>
    </div>
  )
}

function RisksSection({ sec }) {
  const c = COLORS[sec.id]
  return (
    <div>
      <img src={IMGS.complications} alt="diabetes complications" className="img-hero" onError={e => e.target.style.display='none'} />
      <p style={{ lineHeight:1.7, marginBottom:14 }}>{sec.content.summary}</p>
      <h3 style={{ marginBottom:10, color:c.main }}>Risk Factors</h3>
      {sec.content.risks.map((r, i) => (
        <div key={i} style={{ fontSize:12, padding:'7px 0', borderBottom:'1px solid #EDE9FE', display:'flex', gap:8 }}>
          <span style={{ color:c.main, fontWeight:700 }}>•</span>
          <span style={{ lineHeight:1.5 }}>{r}</span>
        </div>
      ))}
      <h3 style={{ margin:'16px 0 10px', color:'#C2410C' }}>Possible Complications</h3>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        {sec.content.complications.map((comp, i) => (
          <div key={i} className="chip" style={{ background:'#FAF5FF' }}>
            <span style={{ fontSize:22 }}>{comp.icon}</span>
            <span style={{ lineHeight:1.3 }}>{comp.label}</span>
          </div>
        ))}
      </div>
      <div className="tip-box">💡 {sec.content.tip}</div>
    </div>
  )
}

function HelpSection({ sec }) {
  return (
    <div>
      <img src={IMGS.emergency} alt="emergency ambulance" className="img-hero" onError={e => e.target.style.display='none'} />
      <p style={{ lineHeight:1.7, marginBottom:14 }}>{sec.content.summary}</p>
      <div style={{ padding:14, marginBottom:12, borderRadius:13, background:'#FEF2F2', border:'2px solid #DC2626' }}>
        <h3 style={{ color:'#DC2626', marginBottom:8 }}>🚨 Call 911 or Go to ER Immediately</h3>
        {sec.content.emergency.map((e, i) => (
          <div key={i} style={{ padding:'6px 0', borderBottom: i<sec.content.emergency.length-1 ? '1px solid #FECACA' : 'none', lineHeight:1.5 }}>⚡ {e}</div>
        ))}
      </div>
      <div style={{ padding:14, marginBottom:12, borderRadius:13, background:'#FFF7ED', border:'2px solid #F97316' }}>
        <h3 style={{ color:'#C2410C', marginBottom:8 }}>📞 Call Your Doctor Soon</h3>
        {sec.content.callDoctor.map((e, i) => (
          <div key={i} style={{ padding:'5px 0', lineHeight:1.5 }}>• {e}</div>
        ))}
      </div>
      <div style={{ padding:14, borderRadius:13, background:'#EFF6FF', border:'2px solid #2563EB' }}>
        <h3 style={{ color:'#1D4ED8', marginBottom:8 }}>🇨🇦 Canadian Resources</h3>
        {sec.content.resources.map((r, i) => (
          <div key={i} style={{ padding:'5px 0', borderBottom: i<sec.content.resources.length-1 ? '1px solid #BFDBFE' : 'none', lineHeight:1.5 }}>
            <strong style={{ color:'#2563EB' }}>{r.label}:</strong> {r.value}
          </div>
        ))}
      </div>
      <div className="tip-box">💡 {sec.content.tip}</div>
    </div>
  )
}

function SectionContent({ sec }) {
  if (sec.id === 'what')       return <WhatSection sec={sec} />
  if (sec.id === 'symptoms')   return <SymptomsSection sec={sec} />
  if (sec.id === 'diet')       return <DietSection sec={sec} />
  if (sec.id === 'lifestyle')  return <LifestyleSection sec={sec} />
  if (sec.id === 'meds')       return <MedsSection sec={sec} />
  if (sec.id === 'monitoring') return <MonitoringSection sec={sec} />
  if (sec.id === 'risks')      return <RisksSection sec={sec} />
  if (sec.id === 'help')       return <HelpSection sec={sec} />
  return null
}

function Splash({ onStart }) {
  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#1E3A8A 0%,#2563EB 45%,#38BDF8 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', fontFamily:"'Carlito','Calibri','Segoe UI',sans-serif", padding:'52px 28px 40px', color:'#fff', textAlign:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-70, right:-70, width:220, height:220, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>
      <div style={{ position:'absolute', bottom:80, left:-90, width:260, height:260, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }}/>
      <div/>
      <div style={{ position:'relative', zIndex:2 }}>
        <div style={{ width:110, height:110, borderRadius:'50%', background:'rgba(255,255,255,0.18)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:58, margin:'0 auto 26px', border:'2px solid rgba(255,255,255,0.3)', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
          🩸
        </div>
        <h1 style={{ marginBottom:6 }}>Know Your Diabetes</h1>
        <p style={{ fontSize:14, opacity:0.85, marginBottom:4 }}>A Patient Education Guide</p>
        <p style={{ fontSize:13, opacity:0.8, marginBottom:2, fontWeight:600 }}>Christian Umeokonkwo &amp; Skylar Ozkaynak</p>
        <p style={{ fontSize:11, opacity:0.55, marginBottom:36 }}>Pathophysiology I · 2025</p>
        <div style={{ display:'flex', gap:10, justifyContent:'center', marginBottom:36, flexWrap:'wrap' }}>
          {['8 Topics','🇨🇦 Canadian Guidelines','Grade 6–8 Reading Level'].map((l, i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.16)', borderRadius:20, padding:'5px 13px', fontSize:11, fontWeight:600 }}>{l}</div>
          ))}
        </div>
        <button onClick={onStart} style={{ padding:'16px 52px', borderRadius:30, background:'#fff', color:'#1D4ED8', border:'none', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Carlito','Calibri',sans-serif", boxShadow:'0 6px 24px rgba(0,0,0,0.25)' }}>
          Start Learning →
        </button>
      </div>
      <p style={{ fontSize:10, opacity:0.4, position:'relative', zIndex:2 }}>Based on Diabetes Canada Clinical Practice Guidelines</p>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [activeIdx, setActiveIdx] = useState(null)

  if (screen === 'splash') return (
    <>
      <GlobalStyle />
      <Splash onStart={() => setScreen('home')} />
    </>
  )

  if (screen === 'section' && activeIdx !== null) {
    const sec = sections[activeIdx]
    const c = COLORS[sec.id]
    return (
      <>
        <GlobalStyle />
        <div style={{ minHeight:'100vh', background:c.light, fontFamily:"'Carlito','Calibri','Segoe UI',sans-serif" }}>
          <div style={{ background:`linear-gradient(135deg,${c.main},${c.accent})`, padding:'16px 18px 22px', position:'sticky', top:0, zIndex:10, boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }}>
            <button className="back-btn" onClick={() => setScreen('home')}>← All Topics</button>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:10 }}>
              <div style={{ width:48, height:48, borderRadius:14, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{sec.emoji}</div>
              <div>
                <h2 style={{ color:'#fff', margin:0 }}>{sec.title}</h2>
                <p style={{ color:'rgba(255,255,255,0.8)', margin:0, fontSize:12 }}>{sec.subtitle}</p>
              </div>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 16px 0' }}>
            <button className="nav-btn" onClick={() => setActiveIdx(i => Math.max(0, i-1))} disabled={activeIdx===0}
              style={{ background: activeIdx===0 ? '#E2E8F0' : c.main, color: activeIdx===0 ? '#94A3B8' : '#fff', opacity: activeIdx===0 ? 0.5 : 1 }}>
              ← Prev
            </button>
            <span style={{ fontSize:11, color:'#94A3B8', alignSelf:'center' }}>{activeIdx+1} / {sections.length}</span>
            <button className="nav-btn" onClick={() => setActiveIdx(i => Math.min(sections.length-1, i+1))} disabled={activeIdx===sections.length-1}
              style={{ background: activeIdx===sections.length-1 ? '#E2E8F0' : c.main, color: activeIdx===sections.length-1 ? '#94A3B8' : '#fff', opacity: activeIdx===sections.length-1 ? 0.5 : 1 }}>
              Next →
            </button>
          </div>
          <div className="scroll-area"><SectionContent sec={sec} /></div>
        </div>
      </>
    )
  }

  return (
    <>
      <GlobalStyle />
      <div style={{ minHeight:'100vh', background:'#F1F5F9', fontFamily:"'Carlito','Calibri','Segoe UI',sans-serif" }}>
        <div style={{ background:'linear-gradient(135deg,#1E3A8A,#2563EB)', padding:'20px 18px 24px', color:'#fff' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <h1 style={{ margin:'0 0 3px' }}>Know Your Diabetes</h1>
              <p style={{ fontSize:12, opacity:0.75, margin:'0 0 10px' }}>Christian Umeokonkwo &amp; Skylar Ozkaynak</p>
            </div>
            <span style={{ fontSize:30 }}>🩸</span>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {['8 Topics','🇨🇦 Canadian','Easy to Read','Tap Any Card'].map((tag, i) => (
              <span key={i} style={{ background:'rgba(255,255,255,0.18)', borderRadius:14, padding:'3px 10px', fontSize:10, fontWeight:600 }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ margin:'14px 16px 0', padding:'10px 14px', background:'#FFFBEB', borderRadius:12, fontSize:12, borderLeft:'4px solid #F59E0B', lineHeight:1.6 }}>
          🇨🇦 All information based on <strong>Diabetes Canada</strong> and <strong>Health Canada</strong> guidelines.
        </div>

        <div style={{ padding:'14px 16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {sections.map((sec, i) => {
            const c = COLORS[sec.id]
            return (
              <div key={sec.id} className="card" onClick={() => { setActiveIdx(i); setScreen('section') }} style={{ borderTop:`5px solid ${c.main}` }}>
                <div style={{ padding:'14px 13px 13px' }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:c.light, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:10 }}>
                    {sec.emoji}
                  </div>
                  <strong style={{ fontSize:13, color:'#1E293B', display:'block', lineHeight:1.3, marginBottom:4 }}>{sec.title}</strong>
                  <p style={{ fontSize:11, color:'#94A3B8', lineHeight:1.4, margin:'0 0 10px' }}>{sec.subtitle}</p>
                  <div style={{ fontSize:11, fontWeight:700, color:c.main }}>Read more →</div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ margin:'4px 16px 16px', padding:'14px 16px', background:'#fff', borderRadius:16, boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
          <h3 style={{ marginBottom:10, color:'#1E293B' }}>📚 References</h3>
          {[
            'Diabetes Canada. (2023). Clinical Practice Guidelines. diabetes.ca',
            'Health Canada. (2023). Diabetes in Canada. canada.ca/health',
            'Heart & Stroke Foundation Canada. heartandstroke.ca',
            'Public Health Agency of Canada. phac-aspc.gc.ca',
          ].map((ref, i) => (
            <p key={i} style={{ color:'#64748B', margin:'0 0 6px', lineHeight:1.6 }}>• {ref}</p>
          ))}
        </div>

        <div style={{ margin:'0 16px 28px', padding:'12px 14px', background:'linear-gradient(135deg,#EFF6FF,#DBEAFE)', borderRadius:14, textAlign:'center', border:'1px solid #BFDBFE' }}>
          <p style={{ margin:0, lineHeight:1.7, color:'#475569' }}>
            Created by <strong style={{ color:'#2563EB' }}>Christian Umeokonkwo</strong> &amp; <strong style={{ color:'#2563EB' }}>Skylar Ozkaynak</strong><br/>
            <span style={{ fontSize:11, opacity:0.7 }}>Pathophysiology I · 2025</span>
          </p>
        </div>
      </div>
    </>
  )
}

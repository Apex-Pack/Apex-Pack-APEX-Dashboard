import React, { useState, useEffect } from 'react';

const RAILWAY_URL = 'https://web-production-8056d.up.railway.app';

const AGENTS = [
  { id: 'scout',      name: 'Scout',   room: 'Research',   color: '#6C63FF' },
  { id: 'analyst',    name: 'Alan',    room: 'Research',   color: '#6C63FF' },
  { id: 'recon',      name: 'Rico',    room: 'Research',   color: '#6C63FF' },
  { id: 'designer',   name: 'Dennis',  room: 'Creative',   color: '#00D4AA' },
  { id: 'copywriter', name: 'Cody',    room: 'Operations', color: '#FF6B6B' },
  { id: 'publisher',  name: 'Pam',     room: 'Operations', color: '#FF6B6B' },
  { id: 'treasurer',  name: 'Trevor',  room: 'Finance',    color: '#C9A84C' },
];

const styles = {
  root: {
    background: '#0D1117',
    minHeight: '100vh',
    color: '#C9A84C',
    fontFamily: "'Share Tech Mono', 'Courier New', monospace",
  },
  topbar: {
    background: '#07080f',
    borderBottom: '2px solid #C9A84C',
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { fontSize: '11px', fontWeight: 'bold', color: '#C9A84C', letterSpacing: '3px' },
  logoSub: { fontSize: '7px', color: '#8B6914', marginTop: '2px', letterSpacing: '1px' },
  ticker: {
    background: '#C9A84C',
    overflow: 'hidden',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
  },
  tickerInner: {
    fontSize: '7px',
    color: '#0D1117',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    animation: 'ticker 30s linear infinite',
    paddingLeft: '100%',
  },
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto auto',
    gap: '2px',
    padding: '2px',
    background: '#1a1a2e',
  },
  room: (color) => ({
    background: '#0D1117',
    border: `2px solid ${color}44`,
    padding: '12px',
    position: 'relative',
  }),
  roomLabel: (color) => ({
    fontSize: '7px',
    color: color,
    letterSpacing: '2px',
    marginBottom: '10px',
    paddingBottom: '5px',
    borderBottom: `1px solid ${color}44`,
  }),
  agentGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  agentCard: (color, selected, status) => ({
    background: selected ? `${color}18` : '#0a0a12',
    border: `1px solid ${selected ? color : color + '33'}`,
    padding: '8px 10px',
    cursor: 'pointer',
    minWidth: '80px',
    transition: 'all 0.2s',
  }),
  agentName: (color, status) => ({
    fontSize: '8px',
    color: status === 'running' ? color : '#8B6914',
    fontWeight: 'bold',
    marginBottom: '3px',
  }),
  agentStatus: (status) => ({
    fontSize: '7px',
    color: status === 'running' ? '#00D4AA' :
           status === 'error' ? '#FF6B6B' :
           status === 'idle' ? '#3a3020' : '#3a3020',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  }),
  statusDot: (status) => ({
    width: '5px',
    height: '5px',
    borderRadius: '0',
    background: status === 'running' ? '#00D4AA' :
                status === 'error' ? '#FF6B6B' : '#2a2010',
    animation: status === 'running' ? 'blink 0.8s infinite' : 'none',
  }),
  commandRoom: {
    background: '#07080f',
    border: '2px solid #C9A84C44',
    padding: '12px',
    gridColumn: '1 / 4',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '12px',
  },
  ceoDesk: {
    background: '#0a0a0e',
    border: '2px solid #C9A84C',
    padding: '10px',
  },
  ceoDeskTitle: {
    fontSize: '7px',
    color: '#E8C97A',
    letterSpacing: '2px',
    marginBottom: '8px',
  },
  approvalCard: {
    background: '#1a1208',
    border: '1px solid #C9A84C44',
    padding: '8px',
    marginBottom: '6px',
  },
  approvalTitle: {
    fontSize: '7px',
    color: '#E8C97A',
    marginBottom: '3px',
  },
  approvalScore: {
    fontSize: '6px',
    color: '#8B6914',
    marginBottom: '6px',
  },
  approvalBtns: {
    display: 'flex',
    gap: '6px',
  },
  btnApprove: {
    background: '#00D4AA22',
    border: '1px solid #00D4AA',
    color: '#00D4AA',
    fontFamily: 'monospace',
    fontSize: '6px',
    padding: '3px 8px',
    cursor: 'pointer',
  },
  btnReject: {
    background: '#FF6B6B22',
    border: '1px solid #FF6B6B',
    color: '#FF6B6B',
    fontFamily: 'monospace',
    fontSize: '6px',
    padding: '3px 8px',
    cursor: 'pointer',
  },
  treasuryRoom: {
    background: '#0D1117',
    border: '2px solid #C9A84C44',
    padding: '12px',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
    borderBottom: '1px solid #1a1a2e',
  },
  statLabel: { fontSize: '7px', color: '#5a4a20' },
  statValue: (color) => ({ fontSize: '8px', color: color || '#C9A84C' }),
  taskFeed: {
    background: '#060608',
    border: '1px solid #1a1a2e',
    padding: '6px',
    height: '80px',
    overflowY: 'auto',
  },
  feedItem: (type) => ({
    fontSize: '7px',
    color: type === 'new' ? '#00D4AA' : type === 'warn' ? '#FF6B6B' : '#2a3020',
    marginBottom: '3px',
    lineHeight: '1.6',
  }),
  botbar: {
    background: '#07080f',
    borderTop: '2px solid #C9A84C',
    padding: '6px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  runBtn: (running) => ({
    background: running ? '#001a14' : '#1a1208',
    border: `2px solid ${running ? '#00D4AA' : '#C9A84C'}`,
    color: running ? '#00D4AA' : '#C9A84C',
    fontFamily: 'monospace',
    fontSize: '8px',
    padding: '6px 16px',
    cursor: 'pointer',
    letterSpacing: '1px',
  }),
  sysStatus: { fontSize: '7px', color: '#2a2010' },
  sysOnline: { color: '#00D4AA' },
};

export default function App() {
  const [agentStatuses, setAgentStatuses] = useState({});
  const [treasury, setTreasury] = useState({ total_revenue: 0, total_costs: 0, net_profit: 0 });
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [running, setRunning] = useState(false);
  const [approvals, setApprovals] = useState([
    { id: 1, title: 'TRAIL RUNNING NICHE', score: '87/100', risk: 'LOW', margin: '42%' }
  ]);
  const [feedItems, setFeedItems] = useState([
    { msg: 'APEX V3 backend connected', type: 'new' },
    { msg: 'All 7 agents registered', type: 'new' },
    { msg: 'Scheduler armed — next run 06:00 UTC', type: 'new' },
  ]);
  const [clock, setClock] = useState('');

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setClock(new Date().toISOString().substr(11, 8) + ' UTC');
    }, 1000);
    return () => clearInterval(t);
  }, []);

  async function fetchData() {
    try {
      const [agentsRes, treasuryRes, tasksRes] = await Promise.all([
        fetch(`${RAILWAY_URL}/agents`),
        fetch(`${RAILWAY_URL}/treasury/summary`),
        fetch(`${RAILWAY_URL}/tasks/recent`),
      ]);
      const agentsData = await agentsRes.json();
      const treasuryData = await treasuryRes.json();
      const tasksData = await tasksRes.json();

      const statusMap = {};
      (agentsData.agents || []).forEach(a => {
        statusMap[a.name] = a.status;
      });
      setAgentStatuses(statusMap);
      setTreasury(treasuryData);
      setTasks((tasksData.tasks || []).slice(0, 8));
    } catch (e) {
      addFeed('Connection error — retrying in 30s', 'warn');
    }
  }

  function addFeed(msg, type = 'new') {
    const time = new Date().toISOString().substr(11, 8);
    setFeedItems(prev => [{ msg: `[${time}] ${msg}`, type }, ...prev].slice(0, 12));
  }

  async function runPipeline() {
    if (running) return;
    setRunning(true);
    addFeed('CEO triggered manual pipeline run');

    const order = ['scout', 'analyst', 'recon', 'designer', 'copywriter', 'publisher', 'treasurer'];
    order.forEach((id, i) => {
      setTimeout(() => {
        setAgentStatuses(prev => ({ ...prev, [id]: 'running' }));
        const agent = AGENTS.find(a => a.id === id);
        addFeed(`${agent.name} (${agent.id}) activated`);
      }, i * 500);
      setTimeout(() => {
        setAgentStatuses(prev => ({ ...prev, [id]: 'idle' }));
      }, i * 500 + 1200);
    });

    try {
      await fetch(`${RAILWAY_URL}/pipeline/run`);
    } catch (e) {}

    setTimeout(() => {
      setRunning(false);
      addFeed('Pipeline complete — check Supabase for results');
      fetchData();
    }, order.length * 500 + 1500);
  }

  function approveCard(id) {
    setApprovals(prev => prev.filter(a => a.id !== id));
    addFeed('CEO approved opportunity — routing to Research');
  }

  function rejectCard(id) {
    setApprovals(prev => prev.filter(a => a.id !== id));
    addFeed('CEO rejected opportunity — logged to scoring model', 'warn');
  }

  const selectedAgent = AGENTS.find(a => a.id === selected);

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.2; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a12; }
        ::-webkit-scrollbar-thumb { background: #C9A84C44; }
      `}</style>

      {/* Top Bar */}
      <div style={styles.topbar}>
        <div>
          <div style={styles.logo}>THE HOUSE OF PACKARD</div>
          <div style={styles.logoSub}>APEX V3 — AUTONOMOUS BUSINESS OS — 1 PACKARD PLAZA, NEW YORK NY</div>
        </div>
        <div style={{ fontSize: '8px', color: '#5a4a20' }}>{clock}</div>
      </div>

      {/* Ticker */}
      <div style={styles.ticker}>
        <div style={styles.tickerInner}>
          {Array(2).fill(
            '◆ HOUSE OF PACKARD ◆ APEX V3 ONLINE ◆ SCOUT: IDLE ◆ ALAN: IDLE ◆ RICO: IDLE ◆ DENNIS: IDLE ◆ CODY: IDLE ◆ PAM: IDLE ◆ TREVOR: IDLE ◆ NET PROFIT: $' +
            treasury.net_profit.toFixed(2) + ' ◆ NEXT PIPELINE: 06:00 UTC ◆   '
          ).join('')}
        </div>
      </div>

      {/* Main Grid */}
      <div style={styles.main}>

        {/* Research Room */}
        <div style={styles.room('#6C63FF')}>
          <div style={styles.roomLabel('#6C63FF')}>◈ RESEARCH WING</div>
          <div style={styles.agentGrid}>
            {AGENTS.filter(a => a.room === 'Research').map(agent => {
              const status = agentStatuses[agent.id] || 'idle';
              return (
                <div
                  key={agent.id}
                  style={styles.agentCard(agent.color, selected === agent.id, status)}
                  onClick={() => setSelected(selected === agent.id ? null : agent.id)}
                >
                  <div style={styles.agentName(agent.color, status)}>{agent.name}</div>
                  <div style={styles.agentStatus(status)}>
                    <div style={styles.statusDot(status)} />
                    {status.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Creative Studio */}
        <div style={styles.room('#00D4AA')}>
          <div style={styles.roomLabel('#00D4AA')}>◈ CREATIVE STUDIO</div>
          <div style={styles.agentGrid}>
            {AGENTS.filter(a => a.room === 'Creative').map(agent => {
              const status = agentStatuses[agent.id] || 'idle';
              return (
                <div
                  key={agent.id}
                  style={styles.agentCard(agent.color, selected === agent.id, status)}
                  onClick={() => setSelected(selected === agent.id ? null : agent.id)}
                >
                  <div style={styles.agentName(agent.color, status)}>{agent.name}</div>
                  <div style={styles.agentStatus(status)}>
                    <div style={styles.statusDot(status)} />
                    {status.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operations Floor */}
        <div style={styles.room('#FF6B6B')}>
          <div style={styles.roomLabel('#FF6B6B')}>◈ OPERATIONS FLOOR</div>
          <div style={styles.agentGrid}>
            {AGENTS.filter(a => a.room === 'Operations').map(agent => {
              const status = agentStatuses[agent.id] || 'idle';
              return (
                <div
                  key={agent.id}
                  style={styles.agentCard(agent.color, selected === agent.id, status)}
                  onClick={() => setSelected(selected === agent.id ? null : agent.id)}
                >
                  <div style={styles.agentName(agent.color, status)}>{agent.name}</div>
                  <div style={styles.agentStatus(status)}>
                    <div style={styles.statusDot(status)} />
                    {status.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Treasury */}
        <div style={styles.treasuryRoom}>
          <div style={styles.roomLabel('#C9A84C')}>◈ TREASURY — TREVOR</div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>REVENUE</span>
            <span style={styles.statValue('#00D4AA')}>${treasury.total_revenue.toFixed(2)}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>COSTS</span>
            <span style={styles.statValue('#FF6B6B')}>${treasury.total_costs.toFixed(2)}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>NET PROFIT</span>
            <span style={styles.statValue('#C9A84C')}>${treasury.net_profit.toFixed(2)}</span>
          </div>
          <div style={{ marginTop: '8px' }}>
            {AGENTS.filter(a => a.room === 'Finance').map(agent => {
              const status = agentStatuses[agent.id] || 'idle';
              return (
                <div
                  key={agent.id}
                  style={{ ...styles.agentCard(agent.color, selected === agent.id, status), marginTop: '6px' }}
                  onClick={() => setSelected(selected === agent.id ? null : agent.id)}
                >
                  <div style={styles.agentName(agent.color, status)}>{agent.name}</div>
                  <div style={styles.agentStatus(status)}>
                    <div style={styles.statusDot(status)} />
                    {status.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Feed */}
        <div style={{ ...styles.room('#8B6914'), gridColumn: '2 / 4' }}>
          <div style={styles.roomLabel('#8B6914')}>◈ LIVE ACTIVITY FEED</div>
          <div style={styles.taskFeed}>
            {feedItems.map((item, i) => (
              <div key={i} style={styles.feedItem(item.type)}>{item.msg}</div>
            ))}
          </div>
        </div>

        {/* Command Room */}
        <div style={{ ...styles.commandRoom }}>

          {/* CEO Desk */}
          <div style={styles.ceoDesk}>
            <div style={styles.ceoDeskTitle}>▸ CEO TERMINAL — THE CORNER OFFICE</div>
            {selectedAgent ? (
              <div>
                <div style={{ fontSize: '8px', color: selectedAgent.color, marginBottom: '4px', fontWeight: 'bold' }}>
                  {selectedAgent.name} — {selectedAgent.room}
                </div>
                <div style={{ fontSize: '7px', color: '#8B6914', lineHeight: '1.8' }}>
                  Status: {(agentStatuses[selectedAgent.id] || 'idle').toUpperCase()}<br />
                  Department: {selectedAgent.room}<br />
                  Agent ID: {selectedAgent.id}<br />
                  Last active: checking...
                </div>
                <div
                  style={{ fontSize: '6px', color: '#3a3020', marginTop: '6px', cursor: 'pointer' }}
                  onClick={() => setSelected(null)}
                >
                  ✕ CLOSE
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '7px', color: '#5a4a20', lineHeight: '1.8' }}>
                  Revenue: <span style={{ color: '#00D4AA' }}>${treasury.total_revenue.toFixed(2)}</span><br />
                  Costs: <span style={{ color: '#FF6B6B' }}>${treasury.total_costs.toFixed(2)}</span><br />
                  Net Profit: <span style={{ color: '#C9A84C' }}>${treasury.net_profit.toFixed(2)}</span><br />
                  Agents Online: <span style={{ color: '#C9A84C' }}>7 / 7</span>
                </div>
                <div style={{ fontSize: '6px', color: '#3a3020', marginTop: '6px' }}>
                  Click any agent to inspect
                </div>
              </div>
            )}
          </div>

          {/* Approval Queue */}
          <div style={{ background: '#0a0a0e', border: '2px solid #8B691444', padding: '10px' }}>
            <div style={{ fontSize: '7px', color: '#8B6914', letterSpacing: '2px', marginBottom: '8px' }}>
              ▸ APPROVAL QUEUE {approvals.length > 0 && (
                <span style={{ color: '#FF6B6B' }}>({approvals.length} PENDING)</span>
              )}
            </div>
            {approvals.length === 0 ? (
              <div style={{ fontSize: '7px', color: '#2a2010' }}>NO PENDING APPROVALS</div>
            ) : (
              approvals.map(a => (
                <div key={a.id} style={styles.approvalCard}>
                  <div style={styles.approvalTitle}>{a.title}</div>
                  <div style={styles.approvalScore}>
                    SCORE: {a.score} ◆ RISK: {a.risk} ◆ MARGIN: {a.margin}
                  </div>
                  <div style={styles.approvalBtns}>
                    <button style={styles.btnApprove} onClick={() => approveCard(a.id)}>✓ APPROVE</button>
                    <button style={styles.btnReject} onClick={() => rejectCard(a.id)}>✗ REJECT</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Department Reports */}
          <div style={{ background: '#0a0a0e', border: '2px solid #6C63FF22', padding: '10px' }}>
            <div style={{ fontSize: '7px', color: '#6C63FF', letterSpacing: '2px', marginBottom: '8px' }}>
              ▸ DEPARTMENT REPORTS
            </div>
            {[
              { dept: 'RESEARCH', value: '0 opportunities', color: '#6C63FF' },
              { dept: 'CREATIVE', value: '0 designs', color: '#00D4AA' },
              { dept: 'OPERATIONS', value: '0 listings live', color: '#FF6B6B' },
              { dept: 'FINANCE', value: '$0.00 net', color: '#C9A84C' },
            ].map(r => (
              <div key={r.dept} style={styles.statRow}>
                <span style={{ fontSize: '6px', color: '#3a3020' }}>{r.dept}</span>
                <span style={{ fontSize: '6px', color: r.color }}>{r.value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.botbar}>
        <div style={styles.sysStatus}>
          RAILWAY <span style={styles.sysOnline}>ONLINE</span> ◆
          SUPABASE <span style={styles.sysOnline}>CONNECTED</span> ◆
          SCHEDULER <span style={styles.sysOnline}>ARMED</span> ◆
          NEXT RUN <span style={styles.sysOnline}>06:00 UTC</span>
        </div>
        <button style={styles.runBtn(running)} onClick={runPipeline} disabled={running}>
          {running ? '⟳ PIPELINE RUNNING...' : '▶ RUN PIPELINE'}
        </button>
      </div>
    </div>
  );
}

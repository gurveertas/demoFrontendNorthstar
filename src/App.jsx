import { useMemo, useState } from 'react'

const initialOpportunities = [
  {
    company: 'Linear',
    initials: 'L',
    color: 'bg-violet-100 text-violet-700',
    contact: 'Amara Okafor',
    role: 'VP of Partnerships',
    value: 48000,
    stage: 'Proposal',
    days: 2,
    focus: true,
  },
  {
    company: 'Vercel',
    initials: 'V',
    color: 'bg-slate-900 text-white',
    contact: 'Daniel Kim',
    role: 'Head of Growth',
    value: 32500,
    stage: 'Negotiation',
    days: 4,
    focus: true,
  },
  {
    company: 'Ramp',
    initials: 'R',
    color: 'bg-emerald-100 text-emerald-700',
    contact: 'Sofia Martinez',
    role: 'Strategic Alliances',
    value: 24000,
    stage: 'Discovery',
    days: 6,
    focus: false,
  },
  {
    company: 'Webflow',
    initials: 'W',
    color: 'bg-sky-100 text-sky-700',
    contact: 'Noah Williams',
    role: 'Director, Biz Dev',
    value: 18500,
    stage: 'Qualified',
    days: 8,
    focus: false,
  },
]

function Icon({ name, className = 'h-5 w-5' }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.7-1.4-2.4L7.1 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

function App() {
  const today = new Date()
  const nextTouchpoint = new Date(today)
  nextTouchpoint.setDate(today.getDate() + 2)
  const [opportunities, setOpportunities] = useState(initialOpportunities)
  const [filter, setFilter] = useState('All deals')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [focusTasks, setFocusTasks] = useState([
    { title: 'Send revised proposal to Linear', detail: 'Amara Okafor · Due today', done: true },
    { title: 'Follow up after discovery call', detail: 'Vercel · Daniel Kim · 2:30 PM', done: false },
  ])

  const visibleOpportunities = useMemo(() => {
    return opportunities.filter((deal) => {
      const matchesFilter = filter === 'Closing soon'
        ? deal.days <= 4
        : filter === 'High value'
          ? deal.value >= 30000
          : true
      const matchesSearch = `${deal.company} ${deal.contact}`.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [filter, opportunities, searchQuery])

  function addOpportunity(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const company = formData.get('company').trim()
    const contact = formData.get('contact').trim()
    const value = Number(formData.get('value'))

    if (!company || !contact || !Number.isFinite(value) || value <= 0) return

    setOpportunities((current) => [
      {
        company,
        initials: company.slice(0, 1).toUpperCase(),
        color: 'bg-amber-100 text-amber-800',
        contact,
        role: 'New prospect',
        value,
        stage: 'Discovery',
        days: 7,
        focus: false,
      },
      ...current,
    ])
    setModalOpen(false)
    setNotice(`${company} was added to your pipeline.`)
    window.setTimeout(() => setNotice(''), 3500)
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[248px] flex-col border-r border-slate-200/80 bg-white px-5 py-7 lg:flex">
        <a className="flex items-center gap-3 px-2" href="#overview" aria-label="Northstar home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#173b35] text-lime-300">
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 2.8 14.4 9.6 21.2 12l-6.8 2.4L12 21.2l-2.4-6.8L2.8 12l6.8-2.4L12 2.8Z" fill="currentColor" />
            </svg>
          </span>
          <span className="text-[17px] font-bold tracking-tight">northstar<span className="text-emerald-700">.</span></span>
        </a>

        <div className="mt-11 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Workspace</div>
        <nav className="mt-3 space-y-1" aria-label="Main navigation">
          <a className="flex items-center gap-3 rounded-xl bg-[#edf4ef] px-3 py-2.5 text-sm font-semibold text-[#173b35]" href="#overview">
            <Icon name="grid" className="h-[18px] w-[18px]" /> Overview
          </a>
          <a className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900" href="#pipeline">
            <Icon name="users" className="h-[18px] w-[18px]" /> Opportunities
            <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">{opportunities.length}</span>
          </a>
          <a className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900" href="#performance">
            <Icon name="chart" className="h-[18px] w-[18px]" /> Performance
          </a>
          <a className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900" href="#activity">
            <Icon name="calendar" className="h-[18px] w-[18px]" /> Activity
          </a>
        </nav>

        <div className="mt-10 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Your workspace</div>
        <button className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900" type="button" onClick={() => setNotice('Workspace settings are ready to customize.')}>
          <Icon name="settings" className="h-[18px] w-[18px]" /> Settings
        </button>

        <div className="mt-auto rounded-2xl bg-[#f4f6f3] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Quarterly target</span>
            <span className="text-xs font-bold text-emerald-800">68%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[68%] rounded-full bg-[#1c5749]" />
          </div>
          <p className="mt-2 text-[11px] text-slate-500">$82k <span className="text-slate-400">of $120k closed</span></p>
        </div>
        <button className="mt-5 flex items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-slate-50" type="button" onClick={() => setNotice('Signed in as Alex Morgan.')}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8d9c9] text-xs font-bold text-[#60452f]">AM</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-semibold text-slate-800">Alex Morgan</span>
            <span className="block truncate text-[11px] text-slate-400">Business development</span>
          </span>
          <Icon name="chevron" className="h-4 w-4 text-slate-400" />
        </button>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-10 flex h-[68px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#173b35] text-lime-300">
              <span className="text-lg">✳</span>
            </span>
            <span className="text-sm font-bold tracking-tight">northstar<span className="text-emerald-700">.</span></span>
          </div>
          <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
            <span>Workspace</span><Icon name="chevron" className="h-3 w-3" /><span className="font-medium text-slate-600">Overview</span>
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <button type="button" aria-label="Search" onClick={() => document.getElementById('pipeline-search')?.focus()} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100">
              <Icon name="search" className="h-[18px] w-[18px]" />
            </button>
            <button type="button" aria-label="Notifications" onClick={() => setNotice('You’re all caught up — no new notifications.')} className="relative grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100">
              <Icon name="bell" className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-400 ring-2 ring-white" />
            </button>
            <span className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-[#e8d9c9] text-[10px] font-bold text-[#60452f] lg:hidden">AM</span>
          </div>
        </header>

        <main id="overview" className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.13em] text-slate-400">{today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <h1 className="mt-2 text-[27px] font-semibold tracking-[-.04em] text-slate-900 sm:text-[32px]">Good morning, Alex <span aria-hidden="true">✦</span></h1>
              <p className="mt-1.5 text-sm text-slate-500">Here’s what’s happening across your partnerships.</p>
            </div>
            <button onClick={() => setModalOpen(true)} type="button" className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#173b35] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#245247] focus:outline-none focus:ring-4 focus:ring-emerald-900/15">
              <Icon name="plus" className="h-4 w-4" /> New opportunity
            </button>
          </div>

          <section aria-label="Quarterly partnership highlight" className="relative isolate mb-7 overflow-hidden rounded-2xl bg-[#173b35] px-6 py-6 text-white sm:px-8 sm:py-7">
            <div className="absolute -right-10 -top-24 -z-10 h-64 w-64 rounded-full border border-white/10 sm:right-16 sm:h-80 sm:w-80" />
            <div className="absolute -right-1 -top-14 -z-10 h-52 w-52 rounded-full border border-white/10 sm:right-24 sm:h-64 sm:w-64" />
            <div className="absolute right-8 top-8 -z-10 hidden h-40 w-40 rounded-full bg-lime-300/10 blur-3xl sm:block" />
            <div className="relative max-w-[570px]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-200/20 bg-lime-200/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.1em] text-lime-200">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300" /> Q4 momentum
              </span>
              <h2 className="mt-4 text-[22px] font-semibold leading-tight tracking-[-.035em] sm:text-[27px]">You’re building something good.</h2>
              <p className="mt-2 max-w-[430px] text-[13px] leading-5 text-emerald-50/70 sm:text-sm">Your pipeline is up 24% this month. Keep the momentum going — two opportunities are ready for a follow-up.</p>
              <a href="#pipeline" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-lime-200 transition hover:text-white">
                Review your pipeline <Icon name="arrow" className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="absolute bottom-7 right-12 hidden items-end gap-2 sm:flex" aria-hidden="true">
              {[36, 54, 45, 70, 61, 88, 76, 100].map((height, index) => (
                <span key={index} style={{ height: `${height}px` }} className={`w-3 rounded-t-sm ${index === 7 ? 'bg-lime-300' : 'bg-white/15'}`} />
              ))}
            </div>
          </section>

          <section id="performance" aria-label="Performance metrics" className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            <Metric label="Pipeline value" value="$148,500" change="+12.8%" icon="chart" tone="green" foot="vs. last month" />
            <Metric label="Active opportunities" value={String(opportunities.length)} change="+3 this week" icon="users" tone="blue" foot="across 4 stages" />
            <Metric label="Meetings booked" value="18" change="+4 this week" icon="calendar" tone="amber" foot="next: today, 2:30 PM" />
            <Metric label="Win rate" value="32.4%" change="+5.2%" icon="arrow" tone="purple" foot="vs. last quarter" />
          </section>

          <section id="pipeline" className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,.025)] sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-[17px] font-semibold tracking-tight text-slate-900">Opportunity pipeline</h2>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{opportunities.length} active</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">Keep your best partnerships moving forward.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <label className="relative min-w-[150px] flex-1 sm:flex-none">
                  <span className="sr-only">Search opportunities</span>
                  <Icon name="search" className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input id="pipeline-search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search deals" className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-800/10 sm:w-40" />
                </label>
                <select aria-label="Filter opportunities" value={filter} onChange={(event) => setFilter(event.target.value)} className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none focus:border-emerald-700">
                  <option>All deals</option><option>Closing soon</option><option>High value</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex gap-1 overflow-x-auto border-b border-slate-100">
              {['All deals', 'Closing soon', 'High value'].map((tab) => (
                <button key={tab} type="button" onClick={() => setFilter(tab)} className={`-mb-px whitespace-nowrap border-b-2 px-3 py-2.5 text-xs font-semibold transition ${filter === tab ? 'border-[#1c5749] text-[#1c5749]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-2">
              <div className="hidden grid-cols-[1.4fr_1.2fr_1fr_.8fr_.8fr_24px] gap-3 px-3 py-3 text-[10px] font-semibold uppercase tracking-[.1em] text-slate-400 sm:grid">
                <span>Company</span><span>Contact</span><span>Stage</span><span>Deal value</span><span>Next step</span><span />
              </div>
              <div className="divide-y divide-slate-100">
                {visibleOpportunities.map((deal) => (
                  <OpportunityRow key={`${deal.company}-${deal.contact}`} deal={deal} onOpen={() => {
                    setNotice(`${deal.company} opportunity selected.`)
                    window.setTimeout(() => setNotice(''), 3500)
                  }} />
                ))}
                {visibleOpportunities.length === 0 && (
                  <p className="py-10 text-center text-sm text-slate-400">No opportunities match this view.</p>
                )}
              </div>
            </div>
            <a href="#activity" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1c5749] hover:text-[#173b35]">
              View all opportunities <Icon name="chevron" className="h-3.5 w-3.5" />
            </a>
          </section>

          <section id="activity" className="mt-7 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[16px] font-semibold tracking-tight">Today’s focus</h2>
                  <p className="mt-1 text-xs text-slate-400">A little follow-through goes a long way.</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-800">{focusTasks.filter((task) => task.done).length} of {focusTasks.length} done</span>
              </div>
              <div className="mt-4 divide-y divide-slate-100">
              {focusTasks.map((task, index) => (
                <FocusItem
                  key={task.title}
                  title={task.title}
                  detail={task.detail}
                  done={task.done}
                  onToggle={() => setFocusTasks((current) => current.map((item, taskIndex) => taskIndex === index ? { ...item, done: !item.done } : item))}
                />
              ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[16px] font-semibold tracking-tight">Upcoming</h2>
                  <p className="mt-1 text-xs text-slate-400">Your next few touchpoints.</p>
                </div>
                <Icon name="calendar" className="h-[18px] w-[18px] text-slate-400" />
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#f7f8f6] p-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-center shadow-sm">
                  <span className="text-[9px] font-bold uppercase text-slate-400">{today.toLocaleDateString('en-US', { month: 'short' })}</span><span className="-mt-1 text-sm font-bold text-slate-800">{today.getDate()}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800">Partnership discovery</p>
                  <p className="mt-1 text-[11px] text-slate-400">Vercel · Today, 2:30 PM</p>
                </div>
                <Icon name="chevron" className="h-4 w-4 text-slate-400" />
              </div>
              <div className="mt-2 flex items-center gap-3 rounded-xl p-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-50 text-center">
                  <span className="text-[9px] font-bold uppercase text-slate-400">{nextTouchpoint.toLocaleDateString('en-US', { month: 'short' })}</span><span className="-mt-1 text-sm font-bold text-slate-800">{nextTouchpoint.getDate()}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800">Quarterly business review</p>
                  <p className="mt-1 text-[11px] text-slate-400">Ramp · {nextTouchpoint.toLocaleDateString('en-US', { weekday: 'short' })}, 11:00 AM</p>
                </div>
                <Icon name="chevron" className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </section>

          <footer className="flex flex-col justify-between gap-2 py-7 text-[10px] text-slate-400 sm:flex-row">
            <span>© {today.getFullYear()} Northstar. Built for better partnerships.</span>
            <span>Small steps. Strong relationships.</span>
          </footer>
        </main>
      </div>

      {notice && (
        <div role="status" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-emerald-300"><Icon name="check" className="h-3.5 w-3.5" /></span>
          {notice}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-30 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-[2px]" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setModalOpen(false)
        }}>
          <section aria-labelledby="modal-title" aria-modal="true" role="dialog" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 id="modal-title" className="text-lg font-semibold tracking-tight">New opportunity</h2>
                <p className="mt-1 text-sm text-slate-500">Add a promising partnership to your pipeline.</p>
              </div>
              <button type="button" onClick={() => setModalOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><Icon name="close" className="h-4 w-4" /></button>
            </div>
            <form onSubmit={addOpportunity} className="mt-5 space-y-4">
              <label className="block text-xs font-semibold text-slate-700">Company name<input name="company" required autoFocus placeholder="e.g. Acme Inc." className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-800/10" /></label>
              <label className="block text-xs font-semibold text-slate-700">Primary contact<input name="contact" required placeholder="e.g. Jamie Lee" className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-800/10" /></label>
              <label className="block text-xs font-semibold text-slate-700">Estimated deal value<input name="value" type="number" min="100" step="100" required placeholder="25000" className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-800/10" /></label>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="h-10 rounded-lg px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button>
                <button type="submit" className="h-10 rounded-lg bg-[#173b35] px-4 text-sm font-semibold text-white hover:bg-[#245247]">Add opportunity</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

function Metric({ label, value, change, icon, tone, foot }) {
  const colors = {
    green: 'bg-emerald-50 text-emerald-800',
    blue: 'bg-blue-50 text-blue-700',
    amber: 'bg-amber-50 text-amber-700',
    purple: 'bg-violet-50 text-violet-700',
  }
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,.025)] sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-medium text-slate-500 sm:text-xs">{label}</span>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${colors[tone]}`}><Icon name={icon} className="h-4 w-4" /></span>
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[22px] font-semibold tracking-[-.04em] text-slate-900 sm:text-[25px]">{value}</span>
        <span className="text-[10px] font-semibold text-emerald-700">{change}</span>
      </div>
      <p className="mt-1 text-[10px] text-slate-400">{foot}</p>
    </article>
  )
}

function OpportunityRow({ deal, onOpen }) {
  const stageColors = {
    Discovery: 'bg-sky-50 text-sky-700',
    Qualified: 'bg-violet-50 text-violet-700',
    Proposal: 'bg-amber-50 text-amber-800',
    Negotiation: 'bg-emerald-50 text-emerald-800',
  }
  return (
    <article className="grid grid-cols-1 gap-2 rounded-xl px-3 py-3.5 transition hover:bg-slate-50/70 sm:grid-cols-[1.4fr_1.2fr_1fr_.8fr_.8fr_24px] sm:items-center sm:gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold ${deal.color}`}>{deal.initials}</span>
        <div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-800">{deal.company}</p><p className="mt-0.5 text-[10px] text-slate-400">Partnership</p></div>
      </div>
      <div className="flex min-w-0 items-center justify-between sm:block"><span className="text-[10px] text-slate-400 sm:hidden">Contact</span><div className="text-right sm:text-left"><p className="truncate text-xs font-medium text-slate-700">{deal.contact}</p><p className="mt-0.5 text-[10px] text-slate-400">{deal.role}</p></div></div>
      <div className="flex items-center justify-between sm:block"><span className="text-[10px] text-slate-400 sm:hidden">Stage</span><span className={`inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${stageColors[deal.stage]}`}>{deal.stage}</span></div>
      <div className="flex items-center justify-between sm:block"><span className="text-[10px] text-slate-400 sm:hidden">Deal value</span><span className="text-xs font-semibold text-slate-800">${deal.value.toLocaleString()}</span></div>
      <div className="flex items-center justify-between sm:block"><span className="text-[10px] text-slate-400 sm:hidden">Next step</span><span className="inline-flex items-center gap-1 text-[10px] text-slate-500"><Icon name="clock" className="h-3 w-3" />{deal.days} days</span></div>
      <button type="button" onClick={onOpen} aria-label={`Open ${deal.company} opportunity`} className="hidden h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700 sm:flex"><Icon name="chevron" className="h-4 w-4" /></button>
    </article>
  )
}

function FocusItem({ title, detail, done, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className="flex w-full items-center gap-3 py-3 text-left">
      <span className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border transition ${done ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300 text-transparent hover:border-emerald-700'}`}><Icon name="check" className="h-3 w-3" /></span>
      <span className="min-w-0 flex-1"><span className={`block truncate text-xs font-medium ${done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{title}</span><span className="mt-1 block text-[10px] text-slate-400">{detail}</span></span>
      {!done && <span className="rounded-md bg-orange-50 px-2 py-1 text-[9px] font-semibold text-orange-700">Today</span>}
    </button>
  )
}

export default App

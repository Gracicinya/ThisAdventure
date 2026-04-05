/* ========================================
   The Shattered Crown: characters.js
   Character data + slider + grid + modal
   ======================================== */

const characters = [
  {
    id: 0,
    role: 'protagonist',
    badge: 'Protagonist',
    name: 'Amara',
    title: 'The Light-Born Shadow',
    kingdom: 'The Sunlit Kingdom of Solmere',
    icon: '☀',
    bgColor: '#2a1e08',
    glowColor: 'rgba(240,192,96,0.35)',
    stats: { strength: 68, magic: 88, resolve: 80 },
    magicType: 'light',
    shortDesc: `Amara grew up in a kingdom where the sun never sets and dark magic is seen as a sickness. She has always had both. She tried for years to hide it, to be what her people needed her to be, but shadows do not stay buried forever.`,
    lore: [
      `Amara was born in Solmere, the kingdom where dawn never fully gives way to evening and the streets glow with a warmth that feels almost too perfect. She should have fit right in. She has her mother's golden eyes and her father's easy laugh. But beneath all of that, woven into her blood like thread in cloth, there is something Solmere does not have a kind name for.`,
      `Dark magic. Not the violent kind. Not the kind that tears and burns. Something quieter. She first noticed it at age seven when she reached into a shadow and it reached back. She told no one.`,
      `For ten years she kept the secret. She studied light magic like every other child in Solmere. She was good at it, genuinely good, but the other half of her power always pressed against the edges, wanting out. When the crown's enforcers began searching homes for signs of dual magic, Amara knew her time was running short.`,
      `She ran the night before they came for her. She had one destination in mind: the Twilight Forest, which every child in Solmere is told is cursed and every adult quietly knows is the only place where being both things at once is not a crime.`
    ],
    quote: `"You keep telling me what I am. I am starting to wonder if you are afraid of what I might become."`
  },
  {
    id: 1,
    role: 'protagonist',
    badge: 'Protagonist',
    name: 'Aria',
    title: 'The Dark-Born Flame',
    kingdom: 'The Moonless Kingdom of Umbrath',
    icon: '☽',
    bgColor: '#0e1028',
    glowColor: 'rgba(120,80,220,0.35)',
    stats: { strength: 72, magic: 85, resolve: 90 },
    magicType: 'dark',
    shortDesc: `Aria came from a kingdom where stars are the only light and light magic is treated like a wound that has not healed properly. She has light inside her and she has spent her whole life fighting the shame of it. She is done fighting. She is running instead.`,
    lore: [
      `Umbrath is a kingdom that prides itself on enduring the dark. Its people have built something beautiful in the absence of sunlight. Libraries lit by bioluminescent ink. Gardens that bloom without warmth. Music written in minor keys that somehow still sound hopeful. It is, in many ways, a remarkable place.`,
      `It is also a place with very little patience for light magic.`,
      `Aria discovered hers at age nine when she accidentally lit a candle with her bare hand during a bad dream. Her mother put it out and told her to never do it again. She did not do it again for four years. Then she did it again. She could not stop it. Light magic in Umbrath is seen as a rejection of everything the kingdom stands for, a kind of treason no one says out loud but everyone believes.`,
      `She was older than Amara when the hunters came for her. She had more time to prepare and less time to hesitate. She took what she needed, memorized a map, and walked into the forest that every child in Umbrath is told leads nowhere and every adult privately hopes they will never have to go.`
    ],
    quote: `"I spent so long trying to be less. I do not think I know how to be more yet. But I am willing to try."`
  },
  {
    id: 2,
    role: 'ally',
    badge: 'Ally',
    name: 'Finn',
    title: 'The Forest-Keeper\'s Son',
    kingdom: 'The Twilight Forest',
    icon: '🌿',
    bgColor: '#0a1a0e',
    glowColor: 'rgba(80,180,80,0.3)',
    stats: { strength: 75, magic: 55, resolve: 85 },
    magicType: 'neutral',
    shortDesc: `Finn has lived in the Twilight Forest his whole life. He does not care where someone is from or what kind of magic they carry. He cares whether they can keep up and whether they are honest. He has helped three refugees before Amara and Aria. He is not sure why he keeps doing it.`,
    lore: [
      `Finn's mother was a cartographer who came to the Twilight Forest to map it and never left. His father was a forest creature in the loosest possible sense: human enough to have a name, wild enough to know every root and tunnel and hidden clearing in fifty miles. Finn inherited both sides of this completely.`,
      `He knows the forest the way some people know the back of their hand, except the forest is always slightly changing and so is Finn's understanding of it. He has no strong feelings about the crown or the prophecy or the war between light and dark. He has very strong feelings about people who lie to him in the first five minutes.`,
      `When Amara stumbled into the forest and immediately tried to pretend she was on a casual walk, Finn did not believe her. When Aria arrived two days later looking like she had not slept in a week and refusing to explain why, he did not push. He has learned to tell the difference between people who lie because they are dangerous and people who lie because they are scared.`,
      `He decided both girls were the second kind. He decided to help them. He has not yet decided if that was the right call, but he is committed now and Finn does not go back on a commitment once it is made.`
    ],
    quote: `"The forest does not care what kingdom you came from. Neither do I. It only cares whether you are paying attention."`
  },
  {
    id: 3,
    role: 'guardian',
    badge: 'Guardian',
    name: 'Sable',
    title: 'Keeper of the Broken Pieces',
    kingdom: 'Ancient — No Kingdom',
    icon: '⟁',
    bgColor: '#141224',
    glowColor: 'rgba(140,100,220,0.35)',
    stats: { strength: 50, magic: 98, resolve: 92 },
    magicType: 'both',
    shortDesc: `Sable has been in the forest since before the crown shattered. She does not speak often and when she does she tends to say exactly one thing too many or exactly one thing too few. She knows where the crown pieces are. She has been waiting for the right people to come for them.`,
    lore: [
      `No one knows exactly what Sable is. She looks like a woman who is somewhere between thirty and several hundred. She speaks in a way that suggests she has had a great many conversations and remembers all of them, though she chooses carefully which ones to reference.`,
      `She was there when Queen Raleigh broke the crown. She did not stop her because she understood the logic, even if she disagreed with the outcome. She has spent the time since then watching the world sort itself into light and dark, waiting for something to shift.`,
      `The arrival of Amara and Aria shifted it. Sable felt it the way you feel a change in weather before the clouds appear. She found them on the third day, uninvited and unhurried, and sat down next to their campfire as if she had always been planning to.`,
      `She told them almost nothing useful at that first meeting. This was intentional. She has learned that the most important things need to be arrived at rather than handed over. She is patient enough to wait for that.`
    ],
    quote: `"The crown was not broken to end the world. It was broken to give the world a chance to choose something better. Whether it does is up to people like you."`
  },
  {
    id: 4,
    role: 'villain',
    badge: 'Enemy',
    name: 'King Dorath',
    title: 'The King Who Fears Balance',
    kingdom: 'The Sunlit Kingdom of Solmere',
    icon: '♛',
    bgColor: '#1e0808',
    glowColor: 'rgba(200,60,60,0.3)',
    stats: { strength: 80, magic: 75, resolve: 95 },
    magicType: 'corrupt-light',
    shortDesc: `King Dorath believes that balance is just another word for compromise and compromise is just another word for weakness. He has kept Solmere in the light for thirty years through force of will, political strategy, and the quiet erasure of anyone who complicated his vision.`,
    lore: [
      `Dorath was not always cruel. This is the most complicated thing about him and the thing most people find hardest to sit with. He genuinely loves Solmere. He genuinely believes that light is better than darkness and that protecting his kingdom means keeping everything that is not light as far away as possible.`,
      `He was the one who ordered the enforcement patrols. He was the one who turned the search for dual-magic children from an informal suspicion into a formal hunt. He told himself it was necessary. He still believes that.`,
      `When he learned that two girls with dual magic had fled into the Twilight Forest, he did not panic. He sent trackers. He sent soldiers. He sent a message to the king of Umbrath suggesting that this was a shared problem with a shared solution.`,
      `He has not considered the possibility that the prophecy is real, that the girls are exactly who the forest seems to think they are, and that his hunters are walking into something older and more patient than anything his kingdom has encountered in thirty years of careful light-only rule.`
    ],
    quote: `"Balance is not peace. Balance is two forces pulling against each other until one of them breaks. I intend to be the one still standing."`
  },
  {
    id: 5,
    role: 'creature',
    badge: 'Creature',
    name: 'The Dusk Wolves',
    title: 'Children of the In-Between',
    kingdom: 'The Twilight Forest',
    icon: '🐺',
    bgColor: '#120a1a',
    glowColor: 'rgba(160,120,240,0.3)',
    stats: { strength: 90, magic: 70, resolve: 80 },
    magicType: 'twilight',
    shortDesc: `The Dusk Wolves are neither fully light nor fully dark. They are the oldest things in the Twilight Forest and one of the only creatures in the world that does not have to choose a side. They have been watching Amara and Aria since the girls arrived. What they decide to do about them is not yet clear.`,
    lore: [
      `The Dusk Wolves existed before the sorcerers' war. Before Solmere and Umbrath developed their separate identities. Before Queen Raleigh made her choice. They have been in the Twilight Forest through all of it, watching and waiting and being very patient about the whole thing.`,
      `They do not speak in any language that humans can easily understand. They communicate in impressions: a certain quality of attention, a direction in which they turn, the particular way they position themselves around something they have decided to protect.`,
      `They surrounded Amara on her first night in the forest. She thought they were going to hurt her. She stayed very still. They left before dawn and she told herself it meant nothing.`,
      `They surrounded Aria on her second night. Aria did not stay still. She told them clearly that she was not interested in being prey. They left before dawn and Aria also told herself it meant nothing.`,
      `Finn, who has known the Dusk Wolves his whole life, watched all of this and said nothing because there are some things you have to let people arrive at on their own.`
    ],
    quote: `No words. Only presence. Only the weight of something ancient deciding whether you are worth following into the dark.`
  }
];

// ── BUILD SLIDER ──────────────────────────
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots  = document.getElementById('sliderDots');
let currentSlide = 0;

characters.forEach((ch, i) => {
  const statKeys = Object.keys(ch.stats);

  const card = document.createElement('div');
  card.className = 'slider-card';
  card.dataset.index = i;

  card.innerHTML = `
    <div class="slider-img-wrap">
      <div class="slider-portrait" style="background:${ch.bgColor};">
        <div class="slider-portrait-placeholder">${ch.icon}</div>
      </div>
      <div class="slider-glow" style="background: radial-gradient(circle, ${ch.glowColor} 0%, transparent 70%);"></div>
    </div>
    <div class="slider-info">
      <span class="role-badge ${ch.role}">${ch.badge}</span>
      <h2 class="char-name">${ch.name}</h2>
      <p class="char-title">${ch.title}</p>
      <p class="char-desc">${ch.shortDesc}</p>
      <div class="char-stats">
        ${statKeys.map(k => `
          <div class="stat">
            <span class="stat-label">${k.charAt(0).toUpperCase() + k.slice(1)}</span>
            <div class="stat-bar"><div class="stat-fill ${ch.role === 'villain' ? 'enemy-fill' : ch.role === 'protagonist' && ch.magicType === 'dark' ? 'dark-fill' : ''}" style="width:${ch.stats[k]}%"></div></div>
          </div>
        `).join('')}
      </div>
      <button class="learn-more-btn" onclick="openModal(${i})">Read full story &#8599;</button>
    </div>
  `;
  sliderTrack.appendChild(card);

  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  sliderDots.appendChild(dot);
});

function goToSlide(n) {
  currentSlide = n;
  sliderTrack.style.transform = `translateX(-${n * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === n);
  });
}

document.getElementById('prevBtn').addEventListener('click', () => {
  goToSlide((currentSlide - 1 + characters.length) % characters.length);
});
document.getElementById('nextBtn').addEventListener('click', () => {
  goToSlide((currentSlide + 1) % characters.length);
});

// auto-advance
setInterval(() => {
  goToSlide((currentSlide + 1) % characters.length);
}, 6000);

// ── BUILD GRID ────────────────────────────
const charGrid = document.getElementById('charGrid');

characters.forEach((ch, i) => {
  const card = document.createElement('div');
  card.className = 'char-card';
  card.dataset.role = ch.role;
  card.innerHTML = `
    <div class="card-portrait" style="background:${ch.bgColor};">
      <div class="card-portrait-placeholder">${ch.icon}</div>
    </div>
    <div class="card-body">
      <span class="role-badge ${ch.role}">${ch.badge}</span>
      <h3 class="card-name">${ch.name}</h3>
      <p class="card-subtitle">${ch.title}</p>
    </div>
  `;
  card.addEventListener('click', () => openModal(i));
  charGrid.appendChild(card);
});

// ── FILTER ────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.char-card').forEach(card => {
      const show = filter === 'all' || card.dataset.role === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ── MODAL ─────────────────────────────────
const overlay  = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');

function openModal(index) {
  const ch = characters[index];
  const statKeys = Object.keys(ch.stats);

  modalContent.innerHTML = `
    <div class="modal-portrait-placeholder" style="background:${ch.bgColor};">
      <span style="font-size:6rem;">${ch.icon}</span>
    </div>
    <span class="role-badge ${ch.role}" style="margin-bottom:0.8rem;display:inline-block;">${ch.badge}</span>
    <h2 class="modal-name">${ch.name}</h2>
    <p class="modal-title">${ch.title} &nbsp;&#8212;&nbsp; ${ch.kingdom}</p>
    <div class="char-stats" style="margin-bottom:1.8rem;">
      ${statKeys.map(k => `
        <div class="stat">
          <span class="stat-label">${k.charAt(0).toUpperCase() + k.slice(1)}</span>
          <div class="stat-bar"><div class="stat-fill ${ch.role === 'villain' ? 'enemy-fill' : ch.role === 'protagonist' && ch.magicType === 'dark' ? 'dark-fill' : ''}" style="width:${ch.stats[k]}%"></div></div>
        </div>
      `).join('')}
    </div>
    <div class="modal-lore">
      ${ch.lore.map(p => `<p>${p}</p>`).join('')}
    </div>
    <div class="modal-quote">${ch.quote}</div>
  `;

  overlay.classList.add('open');
  overlay.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── NAV HAMBURGER ─────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

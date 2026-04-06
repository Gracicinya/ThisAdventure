/* ========================================
   The Shattered Crown — characters.js
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
    image: 'https://image2url.com/r2/default/images/1775492175130-be5936a7-410a-4b24-880c-a2718871e9b0.jpg',
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
    image: 'https://image2url.com/r2/default/images/1775492223024-17ddc84e-6f01-4776-92ae-a8a6d5dd3337.jpg',
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
    image: 'https://image2url.com/r2/default/images/1775241763837-c6ea364f-69fc-4aad-aca4-8fa9bc12abf3.jpg',
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
    kingdom: 'Ancient: No Kingdom',
    image: 'https://image2url.com/r2/default/images/1775492291829-a44e6246-1d5b-439e-80c8-5f56a03348f6.jpg',
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
    image: 'https://image2url.com/r2/default/images/1775492052055-effa325e-584f-4898-b00b-f3da77f26631.jpg',
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
    image: 'https://image2url.com/r2/default/images/1775492113406-7626425a-1508-4d81-b380-3cefbd97cee9.jpg',
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
  },

  // NEW CHARACTERS

  {
    id: 6,
    role: 'villain',
    badge: 'Enemy',
    name: 'Queen Veyra',
    title: 'The Hollow-Hearted Throne',
    kingdom: 'The Moonless Kingdom of Umbrath',
    image: 'https://image2url.com/r2/default/images/1775492392368-b6648e9c-df06-4ed8-a957-3db3406db8a5.jpg',
    bgColor: '#0a1418',
    glowColor: 'rgba(60,180,170,0.3)',
    stats: { strength: 65, magic: 88, resolve: 97 },
    magicType: 'corrupt-dark',
    shortDesc: `Queen Veyra rules Umbrath with a precision that her court mistakes for calm. She is not calm. She is a woman who decided, a long time ago, that grief was a luxury she could not afford. She hunts dual-magic children with the focused energy of someone trying very hard not to think about why.`,
    lore: [
      `Veyra came to the throne young and came to it unwillingly. The crown of Umbrath was not supposed to pass to her — she had two older brothers and a father who had ruled for decades. Then there was a plague, and then there was a war, and then there was a coronation she had not prepared for in a palace that still smelled like her family.`,
      `She had a daughter once. This is not a secret, exactly, but it is not spoken about in Umbrath. The girl was eight years old when she lit a candle in the dark. Veyra saw it. She did not tell anyone. She brought in a healer she trusted, privately, and the healer said the words Veyra had been dreading: dual magic, and deep-rooted, and nothing to be done.`,
      `What happened next, Veyra tells herself, was mercy. She had the girl sent to a place in the northern hills where children with unusual gifts sometimes went. She went back to ruling. She passed the laws about dual-magic detection two years later, tighter and more systematic than anything Umbrath had seen before.`,
      `She does not let herself think about the order in which those two events occurred. She has a kingdom to protect and a throne to hold and an old ache in her chest that she has learned to breathe around. When word came that two dual-magic girls were loose in the Twilight Forest, she agreed with King Dorath's letter immediately and drafted a response before she finished reading it.`
    ],
    quote: `"I do not enjoy this. I want you to understand that. I do what is necessary for Umbrath. I have always done what is necessary for Umbrath."`
  },
  {
    id: 7,
    role: 'ally',
    badge: 'Ally',
    name: 'Ren',
    title: 'The Enforcer Who Stopped',
    kingdom: 'The Sunlit Kingdom of Solmere',
    image: 'https://image2url.com/r2/default/images/1775492553535-44a85bb1-44ac-4714-a579-a53bc0bbaf55.jpg',
    bgColor: '#181410',
    glowColor: 'rgba(180,130,60,0.3)',
    stats: { strength: 88, magic: 30, resolve: 78 },
    magicType: 'none',
    shortDesc: `Ren spent six years as one of Solmere's best enforcement trackers. He was very good at finding people who did not want to be found. He stopped doing it after a particular job involving a ten-year-old boy, a basement, and an order he was given that he chose not to follow. He has been making his way toward the Twilight Forest ever since.`,
    lore: [
      `Ren was recruited into the enforcement corps at nineteen because he was fast and observant and had no family to miss him. He believed in Solmere the way you believe in something you have never questioned: completely and without knowing you are doing it. He was given a crest and a mandate and a list of names, and he did his job.`,
      `The job changed over the years. When he started, enforcement meant watching for signs and reporting them upward. By the time he was twenty-five, it meant raids. By the time he was twenty-six, it meant taking children from their beds in the dark.`,
      `He told himself each time that this was the cost of keeping Solmere safe. He told himself the children were being taken somewhere better for everyone, themselves included. He was very good at telling himself things. Then came the boy in the basement — not one of the targets, just a child who had seen something he was not supposed to see — and Ren was given an order he could not dress up with any amount of telling himself.`,
      `He did not follow it. He left the corps that night. He left Solmere a week later, moving carefully and without announcement, headed toward the one place he had always been told good people did not go. He is not sure if he is a good person. He has decided to figure that out in the Twilight Forest.`
    ],
    quote: `"I am not here to be forgiven. I am here to be useful. I have some years of being useful on the wrong side to account for and I intend to start accounting."`
  },
  {
    id: 8,
    role: 'creature',
    badge: 'Creature',
    name: 'The Mirror Sphinx',
    title: 'Warden of the Third Piece',
    kingdom: 'The Shattered Crown:No Kingdom',
    image: 'https://image2url.com/r2/default/images/1775492618382-90ed81ab-29b6-4f7b-874e-cb5917abefdd.jpg',
    bgColor: '#181820',
    glowColor: 'rgba(200,180,100,0.3)',
    stats: { strength: 85, magic: 96, resolve: 100 },
    magicType: 'both',
    shortDesc: `The Mirror Sphinx was placed at the third crown piece by Queen Raleigh herself, with one instruction: give it only to someone who does not want power for its own sake. It has been waiting in a ruin at the forest's edge for three generations. It asks questions the way a surgeon uses a scalpel: not to explore, but to find exactly the thing that should not be there.`,
    lore: [
      `Queen Raleigh knew that breaking the crown was not enough. Pieces of that much concentrated magic do not sit quietly. They attract. They corrupt. They pull things toward them the way deep water pulls at the unwary. So she made arrangements.`,
      `The Mirror Sphinx was not born. It was made, summoned from the space between questions and answers, given a shape that could be sat with and a mind that could not be fooled. Raleigh spoke to it for three days before she trusted it with the crown piece. At the end of the third day she said: you will know the right ones when you see them. The Sphinx said: how? Raleigh said: they will be the ones who hesitate.`,
      `It has watched seventeen people approach the ruin over the decades. Thirteen ran when they saw it. Two tried to fight it. One tried to bargain, which was almost interesting. One simply sat down and began talking, not about the crown or their intentions or their worthiness, but about their sister and a thing that had happened three winters ago that they still thought about. The Sphinx let that one leave unharmed and thought about the conversation for eleven years afterward.`,
      `When the Dusk Wolves bring Amara and Aria to the ruin's edge, the Sphinx will sit very still and study the way each of them looks at the piece of crown floating in the chamber beyond. It will be looking for something specific. It will be looking for which one looks at it with hunger and which one looks at it with grief.`
    ],
    quote: `"I am not here to test your strength or your cleverness. I am here to find out what you will do when you could take the thing you want and no one is watching. That is the only answer that matters."`
  }
];

// PORTRAIT HELPER
// Renders a portrait with image fallback, used across slider, grid and modal.
function buildPortrait(ch, classes = '') {
  return `
    <img
      class="portrait-img${classes ? ' ' + classes : ''}"
      src="${ch.image}"
      alt="Portrait of ${ch.name}"
      loading="lazy"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
    />
    <div class="portrait-icon-fallback" style="display:none;"></div>
  `;
}

// BUILD SLIDER
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
        ${buildPortrait(ch, 'slider-portrait-img')}
        <div class="slider-portrait-placeholder"></div>
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

// BUILD GRID
const charGrid = document.getElementById('charGrid');

characters.forEach((ch, i) => {
  const card = document.createElement('div');
  card.className = 'char-card';
  card.dataset.role = ch.role;
  card.innerHTML = `
    <div class="card-portrait" style="background:${ch.bgColor};">
      ${buildPortrait(ch, 'card-portrait-img')}
      <div class="card-portrait-placeholder portrait-icon-fallback" style="display:none;"></div>
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

// FILTER
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

// MODAL
const overlay  = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');

function openModal(index) {
  const ch = characters[index];
  const statKeys = Object.keys(ch.stats);

  modalContent.innerHTML = `
    <div class="modal-portrait-wrap" style="background:${ch.bgColor};">
      ${buildPortrait(ch, 'modal-portrait-img')}
      <div class="modal-portrait-icon portrait-icon-fallback" style="display:none;">
      </div>
    </div>
    <span class="role-badge ${ch.role}" style="margin-bottom:0.8rem;display:inline-block;">${ch.badge}</span>
    <h2 class="modal-name">${ch.name}</h2>
    <p class="modal-title">${ch.title} &nbsp;&mdash;&nbsp; ${ch.kingdom}</p>
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

// NAV HAMBURGER
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

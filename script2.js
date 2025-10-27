
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.style.backgroundColor = '#1a5c7a';
  } else {
    header.style.backgroundColor = '#2c7da0';
  }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// 动物数据 - 包含足迹信息和分布区域
const animalData = {
  "siberian-tiger": {
    name: "Siberian Tiger",
    description: "One of the largest wild cats, with approximately 500 individuals left in the wild. They are threatened by poaching and habitat loss.",
    continent: "asia",
    trackImage: "public/images/Siberian Tiger.jpg",
    trackPositions: [
      { x: 65, y: 40 },
      { x: 70, y: 50 },
      { x: 60, y: 55 }
    ],
    trackDescription: "Siberian tiger tracks are large (10-12 cm wide) with four round toes and retractable claws that usually don't show in prints. The heel pad is distinctively large and block-shaped.",
    habitatInfo: "Found primarily in the Sikhote-Alin mountain range in the Russian Far East, with a small population in northeastern China. They prefer coniferous, scrub oak, and birch woodlands."
  },
  
  "amur-leopard": {
    name: "Amur Leopard",
    description: "One of the rarest big cats, with approximately 100 individuals left in the wild. They are threatened by habitat loss and poaching.",
    continent: "asia",
    trackImage: "public/images/AmurLeopard.jpg",
    trackPositions: [
      { x: 68, y: 42 },
      { x: 72, y: 48 }
    ],
    trackDescription: "Amur leopard tracks are smaller than tiger tracks (6-8 cm wide) with a more oval shape. Their prints show four toes with retractable claws that typically don't leave marks.",
    habitatInfo: "Inhabits the temperate forests of the Russian Far East and northeastern China. They prefer areas with dense cover and rocky outcrops."
  },
  
  "sumatran-orangutan": {
    name: "Sumatran Orangutan",
    description: "Only about 14,000 individuals left. They are critically endangered due to habitat loss and poaching.",
    continent: "asia",
    trackImage: "public/images/SumatranOrangutan.jpg",
    trackPositions: [
      { x: 45, y: 65 }
    ],
    trackDescription: "Orangutan tracks show four long toes with opposable thumbs. Their footprints are distinctive with a wide spread between toes, adapted for grasping branches.",
    habitatInfo: "Found exclusively on the Indonesian island of Sumatra, in lowland and hill rainforests. They are arboreal and spend most of their time in trees."
  },
  
  "javan-rhinoceros": {
    name: "Javan Rhinoceros",
    description: "Only about 80 individuals left in the wild. They are critically endangered due to habitat loss and poaching.",
    continent: "asia",
    trackImage: "public/images/JavanRhinoceros.jpg",
    trackPositions: [
      { x: 42, y: 60 }
    ],
    trackDescription: "Javan rhino tracks are large (up to 30 cm wide) with three distinct toes. The print shows a broad, rounded shape with deep indentations from their heavy weight.",
    habitatInfo: "Currently found only in the Ujung Kulon National Park on the western tip of Java, Indonesia. They inhabit tropical rainforests and grasslands."
  },

  "bluefin-tuna": {
    name: "Bluefin tuna",
    description: "A highly migratory species prized for sushi. They are endangered due to overfishing.",
    continent: "all",
    trackImage: "public/images/Bluefin tuna.jpg",
    trackPositions: [
      { x: 25, y: 40 },
      { x: 20, y: 35 },
      { x: 15, y: 45 }
    ],
    trackDescription: "Bluefin tuna do not leave traditional footprints as they are marine animals. However, their presence can be indicated by water disturbances and feeding patterns observed from boats and aerial surveys.",
    habitatInfo: "Found in the Atlantic Ocean and Mediterranean Sea. They prefer temperate and tropical waters and are known for their long migrations across oceans."
  },
  
  "hawksbill-turtle": {
    name: "Hawksbill Turtle",
    description: "Known for their beautiful shell. They are threatened by wildlife trade and fishing gear bycatch.",
    continent: "africa",
    trackImage: "public/images/HawksbillTurtle.jpg",
    trackPositions: [
      { x: 35, y: 60 },
      { x: 55, y: 55 },
      { x: 45, y: 70 }
    ],
    trackDescription: "Hawksbill turtle tracks on beaches show distinctive crawl patterns with flipper marks. The rear flippers leave deeper impressions as they dig nests.",
    habitatInfo: "Found in tropical and subtropical waters worldwide. They nest on sandy beaches and feed on coral reefs."
  },
  
  "vaquita": {
    name: "Vaquita",
    description: "The world's smallest porpoise, with fewer than 10 individuals left. They are endangered by gillnet bycatch.",
    continent: "north-america",
    trackImage: "public/images/Vaquita.jpg",
    trackPositions: [
      { x: 15, y: 65 }
    ],
    trackDescription: "As marine animals, vaquitas don't leave traditional footprints but their presence is indicated by surface splashes and distinctive feeding patterns in water.",
    habitatInfo: "Found exclusively in the northern part of the Gulf of California, Mexico. They prefer shallow, turbid coastal waters."
  },
  
  "blue-whale": {
    name: "Blue Whale",
    description: "The largest animal on Earth. They are recovering but still endangered by ship strikes.",
    continent: "all",
    trackImage: "public/images/Blue Whale.jpg",
    trackPositions: [
      { x: 20, y: 30 },
      { x: 50, y: 40 },
      { x: 80, y: 35 },
      { x: 30, y: 70 },
      { x: 70, y: 65 }
    ],
    trackDescription: "Blue whales don't leave physical tracks but their migration paths and feeding areas are identified through sightings, acoustic monitoring, and satellite tracking.",
    habitatInfo: "Found in all major oceans except the Arctic. They prefer deep offshore waters but migrate to coastal areas to feed during certain times of the year."
  },
  
  "mauritius-kestrel": {
    name: "Mauritius Kestrel",
    description: "One of the world's rarest birds, with approximately 300 individuals left. They are threatened by habitat loss.",
    continent: "africa",
    trackImage: "public/images/Mauritius Kestrel.jpg",
    trackPositions: [
      { x: 50, y: 65 }
    ],
    trackDescription: "Small bird tracks with three forward-pointing toes and one backward-pointing toe. The talon marks are distinct and sharp in their prints.",
    habitatInfo: "Endemic to the island of Mauritius in the Indian Ocean. They inhabit native forests and forest edges."
  },
  
  "philippine-eagle": {
    name: "Philippine Eagle",
    description: "One of the largest eagles, with fewer than 500 pairs left. They are threatened by deforestation.",
    continent: "asia",
    trackImage: "public/images/PhilippineEagle.jpg",
    trackPositions: [
      { x: 50, y: 70 }
    ],
    trackDescription: "Large bird tracks with powerful talon marks. The three forward toes and one rear toe create a distinctive pattern with deep indentations from their strong grip.",
    habitatInfo: "Endemic to the Philippines, primarily found in tropical rainforests on the islands of Luzon, Samar, Leyte, and Mindanao."
  },
  
  "california-condor": {
    name: "California Condor",
    description: "Once extinct in the wild; now approximately 500 individuals. They are recovering via conservation efforts.",
    continent: "north-america",
    trackImage: "public/images/California Condor.jpg",
    trackPositions: [
      { x: 30, y: 50 },
      { x: 25, y: 60 }
    ],
    trackDescription: "Large bird tracks with three forward toes and one rear toe. Their footprints show less prominent talon marks compared to predatory birds.",
    habitatInfo: "Found in the western United States, primarily in California, Arizona, and Utah. They inhabit rocky cliffs for nesting and open areas for foraging."
  },
  
  "whooping-crane": {
    name: "Whooping Crane",
    description: "North America's tallest bird, with approximately 800 left. They are threatened by habitat loss.",
    continent: "north-america",
    trackImage: "public/images/Whooping Crane.jpg",
    trackPositions: [
      { x: 40, y: 45 },
      { x: 50, y: 40 }
    ],
    trackDescription: "Large, three-toed tracks with distinctive webbing between the toes. Their footprints are larger than those of most other North American birds.",
    habitatInfo: "Breeds in the Northwest Territories of Canada and winters along the Gulf Coast of Texas. They prefer wetlands, marshes, and shallow lakes."
  }
};

// 大陆轮廓图片映射
const continentMaps = {
  "asia": "public/images/asia.jpg",
  "africa": "public/images/africa.jpg",
  "north-america": "public/images/north-america.jpg",
  "south-america": "public/images/south-america.jpg",
  "europe": "public/images/europe.jpg",
  "australia": "public/images/australia.jpg",
  "antarctica": "public/images/antarctica.jpg",
  "all": "public/images/world.jpg"
};

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否是足迹页面
  if (window.location.pathname.includes('tracks.html')) {
    initTracksPage();
  } else {
    // 主页面初始化代码
    initMainPage();
  }
});

// 初始化主页面
function initMainPage() {
  // 平滑滚动导航
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 初始化足迹页面
function initTracksPage() {
  // 获取URL参数中的物种名称
  const urlParams = new URLSearchParams(window.location.search);
  const species = urlParams.get('species');
  
  if (species && animalData[species]) {
    const data = animalData[species];
    displayAnimalTracks(data);
  } else {
    // 如果物种不存在，显示错误信息
    document.getElementById('species-name').textContent = 'Species Not Found';
    document.getElementById('species-description').textContent = 'The requested species information could not be found.';
  }
}

// 显示动物足迹信息
function displayAnimalTracks(data) {
  // 设置页面标题和描述
  document.getElementById('species-name').textContent = `${data.name} Tracks`;
  document.getElementById('species-description').textContent = data.description;
  document.getElementById('track-description').textContent = data.trackDescription;
  document.getElementById('habitat-info').textContent = data.habitatInfo;
  
  // 创建大陆轮廓
  const mapContainer = document.getElementById('continent-map');
  const continentOutline = document.createElement('div');
  continentOutline.className = 'continent-outline';
  continentOutline.style.backgroundImage = `url('${continentMaps[data.continent]}')`;
  
  // 添加足迹
  data.trackPositions.forEach(pos => {
    const track = document.createElement('div');
    track.className = 'track';
    track.style.backgroundImage = `url('${data.trackImage}')`;
    track.style.left = `${pos.x}%`;
    track.style.top = `${pos.y}%`;
    
    // 随机旋转角度让足迹更自然
    const rotation = Math.floor(Math.random() * 40) - 20; // -20到20度之间
    track.style.transform = `rotate(${rotation}deg)`;
    
    continentOutline.appendChild(track);
  });
  
  mapContainer.appendChild(continentOutline);
}
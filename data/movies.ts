import { Movie } from '@/types/models';


export const movies: Movie[] = [
  {
    id: 'm1',
    title: 'EL SET',
    originalTitle: 'EL SETT',
    poster: require('../assets/images/ELSETT.png'),
    backdrop: require('../assets/images/ELSETT.png'),
    genres: ['Action', 'Aventure', 'Fantastique'],
    duration: 142,
    rating: 8.5,
    releaseDate: '2025-01-15',
    status: 'now-playing',
    synopsis:
      'تدور أحداث الفيلم حول المسيرة الفنية لأم كلثوم منذ بدايتها حينما إنتقلت من قرية صغيرة في الريف المصري لتمكث في مدينة القاهرة حتى تحقق حلمها في الفن والغناء ، ومن ثَم إنطلقت أم كلثوم بصوتها الجبار وموهبتها الطاغية وطموحاتها المتواصلة إلى النجاح العالمي لفترة تساوي ٧ عقود تقريبًا أنهت الست مسيرتها الفنية بدخولها التاريخ من أوسع أبوابه وتم تتويجها بلقبي كوكب الشرق و صوت الأمة العربية',
    director: ' Marwan Hamed',
    cast: ['Mona Zaki','Ahmad Khaled Salah' , 'Sayed Ragab', 'Amr Saad'],
    ageRating: '12+',
  },
  {
  id: 'm2',
  title: 'Anaconda',
  originalTitle: 'Anaconda',
  poster: require('../assets/images/anaconda.jpg'),
  backdrop: require('../assets/images/anaconda.jpg'),
  genres: ['Action', 'Aventure', 'Comédie'],
  duration: 142,
  rating: 8.5,
  releaseDate: '2025-01-15',
  status: 'now-playing',
  synopsis: `Doug (Jack Black) et Griff (Paul Rudd) sont amis d'enfance et partagent depuis toujours un rêve un peu fou : réaliser leur propre remake de leur film préféré, le “cultissime” Anaconda.
En pleine crise de la quarantaine, ils décident enfin de se lancer, et se retrouvent à tourner en plein cœur de l’Amazonie.
Mais le rêve vire rapidement au cauchemar lorsqu’un véritable anaconda géant fait son apparition sur le plateau et transforme leur tournage déjà chaotique en un véritable piège mortel.
Le film qu’ils meurent d’envie de faire ? Va être vraiment mortel…..`,
  director: 'Marwan Hamed',
  cast: ['Paul Rudd', 'Daniela Melchior', 'Jack Black', 'Thandiwe Newton', 'Steve Zahn', 'Selton Mello'],
  ageRating: '12+',
},

  {
  id: 'm3',
  title: 'Zootopie 2',
  originalTitle: 'Zootopie 2',
  poster: require('../assets/images/zootropolis.png'),
  backdrop: require('../assets/images/zootropolis.png'),
  genres: ['Animation', 'Aventure', 'Comédie'],
  duration: 107, // 1h47
  rating: 8.8,
  releaseDate: '2025-02-12',
  status: 'now-playing',
  synopsis: `Dans « Zootopie 2 » des Studios d'Animation Walt Disney, les détectives Judy Hopps et Nick Wilde se retrouvent sur la piste sinueuse d'un mystérieux reptile qui débarque à Zootropolis et bouleverse la métropole des mammifères.
Pour résoudre l'enquête, Judy et Nick doivent infiltrer les quartiers inattendus de la ville, où leur partenariat naissant est mis à rude épreuve.`,
  director: 'Byron Howard, Jared Bush',
  cast: [
    'Ginnifer Goodwin',
    'Jason Bateman',
    'Ke Huy Quan',
    'Fortune Feimster',
    'Shakira',
  ],
  ageRating: 'Tous',
},

  {
  id: 'm4',
  title: 'Avatar: Fire and Ash',
  originalTitle: 'Avatar: Fire and Ash',
  poster: require('../assets/images/Avatar.jpeg'),
  backdrop: require('../assets/images/Avatar.jpeg'),
  genres: ['Action', 'Aventure', 'Fantastique'],
  duration: 192, // 3h12
  rating: 8.9,
  releaseDate: '2025-12-18',
  status: 'now-playing',
  synopsis: `Avec AVATAR : DE FEU ET DE CENDRES, James Cameron embarque les spectateurs pour un nouveau voyage immersif sur Pandora en compagnie du Marine devenu Na’vi Jake Sully (Sam Worthington), de la guerrière Na’vi Neytiri (Zoë Saldaña) et de toute la famille Sully.`,
  director: 'James Cameron',
  cast: [
    'Sam Worthington',
    'Zoë Saldaña',
    'Stephen Lang',
    'Oona Chaplin',
    'Cliff Curtis',
    'Giovanni Ribisi',
    'Sigourney Weaver',
    'Joel David Moore',
  ],
  ageRating: 'Tous',
},

  {
  id: 'm5',
  title: 'Jujutsu Kaisen: Exécution',
  originalTitle: 'Jujutsu Kaisen: Exécution',
  poster: require('../assets/images/jujutsu-kaisen.jpg'),
  backdrop: require('../assets/images/jujutsu-kaisen.jpg'),
  genres: ['Action', 'Animation'],
  duration: 90, // 1h30
  rating: 8.6,
  releaseDate: '2025-03-01',
  status: 'now-playing',
  synopsis: `Un Rideau s’est abattu autour de Shibuya en pleine soirée d’Halloween et des milliers de personnes se retrouvent enfermées à l’intérieur.
Satoru Gojo, le plus puissant exorciste, se rend sur place, mais il s’agit là d’un piège tendu par les maîtres des fléaux afin de le sceller dans une relique.

Yuji Itadori, avec ses camarades et de nombreux exorcistes de haut rang, se joint au combat, et des affrontements sans précédent l’attendent. C’est l’incident de Shibuya, à la suite duquel dix secteurs à travers le Japon deviennent de véritables nids à fléaux.

Tout cela fait partie du plan orchestré par Noritoshi Kamo, l’exorciste le plus maléfique de l’Histoire. Alors qu’une Traque meurtrière est lancée, l’exorciste de classe S Yuta Okkotsu reçoit pour mission d’exécuter Yuji pour ses crimes supposés.`,
  director: 'Shota Goshozono',
  cast: [
    'Subaru Kimura',
    'Yuichi Nakamura',
    'Nobunaga Shimazaki',
    'Yuma Uchida',
    'Junya Enoki',
    'Asami Seto',
    'Kenjiro Tsuda',
    'Takahiro Sakurai',
    'Daisuke Namikawa',
  ],
  ageRating: '12+',
},


  {
  id: 'm6',
  title: 'Les imposteurs',
  originalTitle: 'LES IMPOSTEURS',
  poster: require('../assets/images/mar.jpg'),
  backdrop: require('../assets/images/mar.jpg'),

  genres: ['Comédie'],
  duration: 110, // 1h50
  rating: 8.0, 
  releaseDate: '2025-01-01',
  status: 'now-playing',
  synopsis:
    "Miloud, Fatiha, Sarah et Anas, escrocs spécialisés dans les arnaques aux mariages, voient leur dernier coup tourner au désastre, traqués par un mafieux et la police. Par hasard, ils se retrouvent mêlés à une riche famille où Fatiha est prise pour une héritière disparue. Sous la menace d’un notaire manipulateur, ils poursuivent la supercherie tout en affrontant dangers et trahisons.",
  director: 'Hicham El Jebbari',
  cast: ['Aziz Daddas', 'Majdouline Idrissi'],
  ageRating: 'Tous',
},
// diagrammes: diag classe , les outils utilisés , realisations ( capture avec description )
{
  id: 'm7',
  title: 'Insaisissables 2',
  originalTitle: 'Now You See Me: Now You Don’t',

  poster: require('../assets/images/nowYouseeme.jpg'),
  backdrop: require('../assets/images/nowYouseeme.jpg'),

  genres: ['Action'],
  duration: 113, // 1h53
  rating: 8.2, // valeur cohérente (pas affichée sur le screen)
  releaseDate: '2016-06-10', // date réelle du film
  status: 'now-playing',

  synopsis:
    "Les Quatre Cavaliers, un groupe de brillants magiciens et illusionnistes, donnent deux spectacles de magie époustouflants : le premier en braquant une banque sur un autre continent, le second en transférant la fortune d’un banquier véreux sur les comptes du public. Deux agents du FBI et d’Interpol sont déterminés à les arrêter avant qu’ils ne mettent à exécution leur promesse de réaliser des braquages encore plus audacieux. Alors que la pression s’intensifie et que le monde entier attend le tour final des Cavaliers, la course contre la montre commence.",

  director: 'Ruben Fleischer',
  cast: [
    'Woody Harrelson',
    'Jesse Eisenberg',
    'Ariana Greenblatt',
    'Justice Smith',
    'Dominic Sessa',
    'Isla Fisher',
    'Dave Franco',
    'Morgan Freeman',
    'Rosamund Pike',
  ],
  ageRating: 'Tous',
},

  {
  id: 'm8',
  title: 'La femme de ménage',
  originalTitle: 'The Housemaid',
  poster: require('../assets/images/lafemmedemenage.jpg'),
  backdrop: require('../assets/images/lafemmedemenage.jpg'),

  genres: ['Thriller'],
  duration: 131, // 2h11
  rating: 8.0,   // pas affichée sur le screen → modifiable
  releaseDate: '2025-02-08', // tu peux garder cette date si c’est ton dataset
  status: 'coming-soon',

  synopsis:
    "LA FEMME DE MÉNAGE est un thriller haletant porté par Sydney Sweeney et Amanda Seyfried, adapté du best-seller à succès de Freida McFadden. Réalisé par Paul Feig, le film entraîne les spectateurs dans un univers aussi élégant que dérangeant, où derrière les sourires parfaits et les apparences soignées, rien n’est ce qu’il semble être. En quête d’un nouveau départ, Millie (Sydney Sweeney) accepte un poste de femme de ménage à demeure chez Nina (Amanda Seyfried) et Andrew Winchester (Brandon Sklenar), un couple aussi riche qu’énigmatique. Ce qui s’annonce comme l’emploi idéal se transforme rapidement en un jeu dangereux, mêlant séduction, secrets et manipulations. Derrière les portes closes du manoir Winchester se cache un monde de faux-semblants et de révélations inattendues… Un tourbillon de suspense et de scandales qui vous tiendra en haleine jusqu’à la dernière seconde.",

  director: 'Paul Feig',
  cast: ['Brandon Sklenar', 'Sydney Sweeney', 'Michele Morrone', 'Amanda Seyfried'],
  ageRating: '16+',
},

];

var skills=[
    {
        id:"nz",
        className:"Co",
        skillName:"Mysterious Multiplier",
        ef:{
            blow:[0,5],
            shot:[0,5],
            magical:[0,5],
            tech:[0,5]
        },
        label:['Inactive','Active [Recommended]'],
        default:1
    },
    {
        id:"wb",
        className:"Co",
        skillName:"Weak Bullet",
        ef:{
            blow:[0,20],
            shot:[0,20],
            magical:[0,20],
            tech:[0,20]
        },
        label:["No WB","1.2x"],
    },
    {
        id:"sst",
        className:"Co",
        skillName:"Shifta Strike",
        ef:{
            blow:[0,10],
            shot:[0,10],
            magical:[0,10],
            tech:[0,10]
        },
        label:["NA","1.1x"]
    },
    {
        id:"wpb",
        className:"Co",
        skillName:"Title Weapon Bonus",
        ef:{
            blow:[0,2.5,5,7.5,10],
            shot:[0,2.5,5,7.5,10],
            magical:[0,0,0,0,0],
            tech:[0,2.5,5,7.5,10]
        },
        label:["None","2.5%","5%","7.5%","10%"],
        onlymain:-1
    },
    {
        id:"rm",
        className:"Co",
        skillName:"Rare Weapon Mastery",
        ef:{
            blow:[0,10],
            shot:[0,10],
            magical:[0,0],
            tech:[0,10]
        },
        label:["Inactive","Active"],
        onlymain:-1
    },
    {
        id:"hlv",
        className:"Co",
        skillName:"High Level Bonus",
        ef:{
            blow:[0,5,10.25],
            shot:[0,5,10.25],
            magical:[0,5,10.25],
            tech:[0,5,10.25]
        },
        label:["None","1.05x","1.1025x"]
    },
    {
        id:"g",
        className:"Co",
        skillName:"Class Gear Multipliers",
        ef:{
            blow:[0,5,10,15,20,30,50],
            shot:[0,5,10,15,20,30,50],
            magical:[0,0,0,0,0,0,0],
            tech:[0,0,0,0,0,0,0]
        },
        label:["No Gear","JB1/TMG2","DB1/JB2/TMG3","DB2/JB3","TD2/DB3","TMG Max","TD3"]
    },
    {
        id:"ja",
        className:"Co",
        skillName:"Just Attack",
        ef:{
            blow:[0,30],
            shot:[0,30],
            magical:[0,0],
            tech:[0,30]
        },
        label:["NA","1.3x"]
    },
    {
        id:"hus",
        className:"Hu",
        skillName:"Hunter Stance",
        ef:{
            blow:[0,20,32.3,38.915,45.53,50],
            shot:[0,10,21.275,27.33875,33.4025,50],
            magical:[0,0,0,5,10,50],
            tech:[0,0,0,5,10,50]
        },
        label:["None","Fury S.","+Fury S. Up","+F.Combo 5","+F.Combo 10","GSAdvance"],
        onlymain:5,
        default:4
    },
    {
        id:"warb",
        className:"Hu",
        skillName:"War Brave",
        ef:{
            blow:[0,3,6,9,12,15],
            shot:[0,3,6,9,12,15],
            magical:[0,3,6,9,12,15],
            tech:[0,3,6,9,12,15]
        },
        label:["NA","1.03x","1.06x","1.09x","1.12x","1.15x"],
        onlymain:-1,
    },
    {
        id:"jab",
        className:"Hu",
        skillName:"JA Bonus",
        ef:{
            blow:[0,10,21],
            shot:[0,10,21],
            magical:[0,0,0],
            tech:[0,0,0]
        },
        label:["None","1.10x","1.21x"],
        default:2
    },
    {
        id:"nvg",
        className:"Hu",
        skillName:"Never Give Up",
        ef:{
            blow:["0","200","220","240","260","300"],
            shot:["0","0","0","0","0","0"],
            magical:["0","0","0","0","0","0"],
            tech:["0","0","0","0","0","0"]
        },
        label:["NA","200 SATK","220","240","260","300 SATK"],
    },
    {
        id:"fis",
        className:"Fi",
        skillName:"Fighter Stance",
        ef:{
            blow:[0,30,35,40,54,75.5],
            shot:[0,30,35,40,54,75.5],
            magical:[0,30,35,40,54,75.5],
            tech:[0,30,35,40,54,75.5]
        },
        label:["None","Wise(F)","Brave(R)/Wise(R)","Brave(F)","+Brave Up","+Wise Up"],
        default:4
    },
    {
        id:"lmtb",
        className:"Fi",
        skillName:"Limit Break",
        ef:{
            blow:[0,4,8,12,16,20],
            shot:[0,0,0,0,0,0],
            magical:[0,0,0,0,0,0],
            tech:[0,0,0,0,0,0]
        },
        label:["None","1.04x","1.08x","1.12x","1.16x","1.20x"],
        onlymain:-1
    },
    {
        id:"crst",
        className:"Fi",
        skillName:"Critical Strike",
        ef:{
            blow:[[0],[15]],
            shot:[[0],[15]],
            magical:[[0],[15]],
            tech:[[0],[15]]
        },
        label:["NA","1.15x"],
        onlymain:-1
    },
    {
        id:"tajab",
        className:"Fi",
        skillName:"Tech Arts JA Bonus",
        ef:{
            blow:[0,5,6,8,10,15],
            shot:[0,5,6,8,10,15],
            magical:[0,0,0,0,0,0],
            tech:[0,5,6,8,10,15]
        },
        label:["NA","1.05x","1.06x","1.08x","1.1x","1.15x"],
        default:5
    },
    {
        id:"halfs",
        className:"Fi",
        skillName:"Halfline Slayer",
        ef:{
            blow:["0","20","22","24","26","28","34","40","60","80","100"],
            shot:["0","20","22","24","26","28","34","40","60","80","100"],
            magical:["0","20","22","24","26","28","34","40","60","80","100"],
            tech:["0","20","22","24","26","28","34","40","60","80","100"]
        },
        label:["NA","20 ATK","22","24","26","28","34","40","60","80","100 ATK"]
    },
    {
        id:"deads",
        className:"Fi",
        skillName:"Deadline Slayer",
        ef:{
            blow:["0","40","44","49","54","60","67","75","100","125","150"],
            shot:["0","40","44","49","54","60","67","75","100","125","150"],
            magical:["0","40","44","49","54","60","67","75","100","125","150"],
            tech:["0","40","44","49","54","60","67","75","100","125","150"]
        },
        label:["NA","40 ATK","44","49","54","60","67","75","100","125","150 ATK"]
    },
    {
        id:"pps",
        className:"Fi",
        skillName:"PP Slayer",
        ef:{
            blow:["0","50","65","80","95","110","125","140","155","170","200"],
            shot:["0","50","65","80","95","110","125","140","155","170","200"],
            magical:["0","50","65","80","95","110","125","140","155","170","200"],
            tech:["0","50","65","80","95","110","125","140","155","170","200"]
        },
        label:["NA","50 ATK","65","80","95","110","125","140","155","170","200 ATK"]
    },
    {
        id:"crzb",
        className:"Fi",
        skillName:"Crazy Beat",
        ef:{
            blow:["0","100","120","140","160","200"],
            shot:["0","0","0","0","0","0"],
            magical:["0","0","0","0","0","0"],
            tech:["0","0","0","0","0","0"]
        },
        label:["NA","100 SATK","120","140","160","200 SATK"]
    },
    {
        id:"chs",
        className:"Fi",
        skillName:"Chase Advance",
        ef:{
            blow:[0,10,15,25],
            shot:[0,0,0,0],
            magical:[0,0,0,0],
            tech:[0,0,0,0]
        },
        label:[" NA","1.1x","1.15x","1.25x"]
    },
    {
        id:"chsp",
        className:"Fi",
        skillName:"Chase Advance Plus",
        ef:{
            blow:[0,5,7,9,11,15],
            shot:[0,5,7,9,11,15],
            magical:[0,5,7,9,11,15],
            tech:[0,5,7,9,11,15]
        },
        label:["NA","1.05x","1.07x","1.09x","1.11x","1.15x"]
    },
    {
        id:"pwb",
        className:"Ra",
        skillName:"Power Bullet",
        ef:{
            blow:["0","0","0","0","0","0"],
            shot:["0","50","60","70","80","100"],
            magical:["0","0","0","0","0","0"],
            tech:["0","0","0","0","0","0"]
        },
        label:["NA","50 RATK","60","70","80","100 RATK"]
    },
    {
        id:"wha",
        className:"Ra",
        skillName:"Weak Hit Advance",
        ef:{
            blow:[0,0,0],
            shot:[0,15,32.25],
            magical:[0,0,0],
            tech:[0,0,0]
        },
        label:["NA","1.15x","1.3225x"],
        default:2
    },
    {
        id:"ssms",
        className:"Ra",
        skillName:"Standing/Moving Snipe",
        ef:{
            blow:[0,0,0],
            shot:[0,25,43.75],
            magical:[0,0,0,0],
            tech:[0,0,0]
        },
        label:["None","1.25x (Moving)","1.4375x (Standing 1/2)"],
        default:2
    },
    {
        id:"fh",
        className:"Ra",
        skillName:"First Hit",
        ef:{
            blow:[0,4,8,12,16,20],
            shot:[0,4,8,12,16,20],
            magical:[0,4,8,12,16,20],
            tech:[0,4,8,12,16,20]
        },
        label:["NA","1.04x","1.08x","1.12x","1.16x","1.2x"],
    },
    {
        id:"ss",
        className:"Ra",
        skillName:"Sharpshooter",
        ef:{
            blow:[0,10],
            shot:[0,10],
            magical:[0,10],
            tech:[0,10]
        },
        label:["NA","1.1x"],
        onlymain:-1,
        default:1
    },
    {
        id:"ct",
        className:"Gu",
        skillName:"Chain Trigger",
        ef:{
            blow:[0,20,30,50,60,65,70,75,80,85,90,100],
            shot:[0,20,30,50,60,65,70,75,80,85,90,100],
            magical:[0,20,30,50,60,65,70,75,80,85,90,100],
            tech:[0,20,30,50,60,65,70,75,80,85,90,100]
        },
        label:["No Chain","1-","9-","19-","29-","39-","49-","59-","69-","79-","89-","99-100 Chain"]
    },
    {
        id:"cf",
        className:"Gu",
        skillName:"Chain Finish",
        ef:{
            blow:[0,50,90,150],
            shot:[0,50,90,150],
            magical:[0,0,0,0],
            tech:[0,0,0,0]
        },
        label:["No Chain","1.50x","1.90x","2.5x"],
        onlymain:-1
    },
    {
        id:"ht",
        className:"Gu",
        skillName:"High Time",
        ef:{
            blow:[0,20],
            shot:[0,20],
            magical:[0,20],
            tech:[0,20]
        },
        label:["NA","1.2x"],
        onlymain:-1,
        default:1
    },
    {
        id:"zra",
        className:"Gu",
        skillName:"Zero Range Advance",
        ef:{
            blow:[0,0,0,0],
            shot:[0,5,10,15.5,21],
            magical:[0,0,0,0],
            tech:[0,0,0,0]
        },
        label:["NA","1.05x","1.15x","1.155x","1.21x"],
        default:4
    },
    {
        id:"pk",
        className:"Gu",
        skillName:"Perfect Keeper",
        ef:{
            blow:[0,10,11,12,13,14,15,16,17,18,20],
            shot:[0,10,11,12,13,14,15,16,17,18,20],
            magical:[0,10,11,12,13,14,15,16,17,18,20],
            tech:[0,10,11,12,13,14,15,16,17,18,20]
        },
        label:["NA","1.1x","1.11x","1.12x","1.13x","1.14x","1.15x","1.16x","1.17x","1.18x","1.2x"],
        default:10
    },
    {
        id:"ea",
        className:"Gu",
        skillName:"Aerial Advance",
        ef:{
            blow:[0,2,4,6,8,10,12,14,16,18,20],
            shot:[0,2,4,6,8,10,12,14,16,18,20],
            magical:[0,2,4,6,8,10,12,14,16,18,20],
            tech:[0,2,4,6,8,10,12,14,16,18,20]
        },
        label:["NA","1.02x","1.04x","1.06x","1.08x","1.1x","1.12x","1.14x","1.16x","1.18x","1.2x"]
    },
    {
        id:"tmgm",
        className:"Gu",
        skillName:"TMG Mastery",
        ef:{
            blow:[[0],[5]],
            shot:[[0],[5]],
            magical:[[0],[5]],
            tech:[[0],[5]]
        },
        label:["NA","1.05x"],
        onlymain:-1,
        default:1
    },
    {
        id:"srb",
        className:"Gu",
        skillName:"S-Roll JA Bonus",
        ef:{
            blow:[0,2,4,6,8,10],
            shot:[0,2,4,6,8,10],
            magical:[0,2,4,6,8,10],
            tech:[0,2,4,6,8,10]
        },
        label:["NA","1.02x","1.04x","1.06x","1.08x","1.1x"]
    },
    {
        id:"ff",
        className:"Fo",
        skillName:"Photon Flare",
        ef:{
            blow:["0","0","0","0","0","0","0","0","0","0","0"],
            shot:["0","0","0","0","0","0","0","0","0","0","0"],
            magical:["0","20","40","60","80","100","120","140","160","180","200"],
            tech:["0","20","40","60","80","100","120","140","160","180","200"]
        },
        label:["NA","20 TATK","40","60","80","100","120","140","160","180","200 TATK"]
    },
    {
        id:"ffa",
        className:"Fo",
        skillName:"Photon Flare Advance",
        ef:{
            blow:["0","0","0","0","0","0","0","0","0","0","0"],
            shot:["0","0","0","0","0","0","0","0","0","0","0"],
            magical:["0","20","40","60","80","100","120","140","160","180","200"],
            tech:["0","20","40","60","80","100","120","140","160","180","200"]
        },
        label:["NA","20 TATK","40","60","80","100","120","140","160","180","200 TATK"]
    },
    {
        id:"ffab",
        className:"Fo",
        skillName:"Photon Flare Afterburst",
        ef:{
            blow:["0","0"],
            shot:["0","0"],
            magical:["0","100"],
            tech:["0","100"]
        },
        label:["NA","100 TATK"],
    },
    {
        id:"tjaa",
        className:"Fo",
        skillName:"Tech JA Advance",
        ef:{
            blow:[0,0],
            shot:[0,0],
            magical:[0,0],
            tech:[0,10]
        },
        label:["NA","1.1x"],
        default:1
    },
    {
        id:"tjant",
        className:"Fo",
        skillName:"Charge/Normal Tech Advance",
        ef:{
            blow:[0,0,0],
            shot:[0,0,0],
            magical:[0,0,0],
            tech:[0,10,21]
        },
        label:["NA","1.1x (Normal /Charge 1)","1.21x (Charge 1/2)"],
        default:2
    },
    {
        id:"ttb",
        className:"Fo",
        skillName:"Talis Tech Bonus",
        ef:{
            blow:[0,0],
            shot:[0,0],
            magical:[0,0],
            tech:[0,20]
        },
        label:["NA","1.2x"]
    },
    //エレメントコンバージョンは独自計算のため組み込み済み
    {
        id:"fom",
        className:"Fo",
        skillName:"Elemental Mastery(Fo)",
        ef:{
            blow:[0,0,0,0,0,0],
            shot:[0,0,0,0,0,0],
            magical:[0,0,0,0,0,0],
            tech:[0,5,18.8,25.4,29.6,36.8,44]
        },
        label:["None","1.05x","1.188x","1.254x","1.296x","1.368x","1.44x"],
        default:6
    },
    {
        id:"wl",
        className:"Te",
        skillName:"Wand Lovers",
        ef:{
            blow:[0,5,18,40],
            shot:[0,0,0,0],
            magical:[0,0,0,0],
            tech:[0,0,0,0]
        },
        label:["None","105%","118%","140%"],
        default:3
    },
    //ウォンドリアクターは独自計算のため組み込み済み
    {
        id:"ewh",
        className:"Te",
        skillName:"Elemental Weak Hit",
        ef:{
            blow:[0,10,20],
            shot:[0,10,20],
            magical:[0,10,20],
            tech:[0,10,20]
        },
        label:["None","1.10x (Wrong Element)","1.2x"],
        default:2
    },
    {
        id:"tem",
        className:"Te",
        skillName:"Elemental Mastery(Te)",
        ef:{
            blow:[0,0,0,0,0,0],
            shot:[0,0,0,0,0,0],
            magical:[0,0,0,0,0,0],
            tech:[0,5,18.8,25.4,29.6,36.8,44]
        },
        label:["None","1.05x","1.188x","1.254x","1.296x","1.368x","1.44x"],
        default:6
    },
    {
        id:"brs",
        className:"Br",
        skillName:"Braver Stance",
        ef:{
            blow:[0,15,35],
            shot:[0,15,35],
            magical:[0,15,35],
            tech:[0,15,35]
        },
        label:["None","Average S.","Weak S."],
        default:1
    },
    {
        id:"brsup",
        className:"Br",
        skillName:"Stance Up & Charge",
        ef:{
            blow:[0,10,21],
            shot:[0,10,21],
            magical:[0,10,21],
            tech:[0,10,21]
        },
        label:["None","1.1x","1.21x"],
        default:1
    },
    {
        id:"cjab",
        className:"Br",
        skillName:"Combo JA Bonus",
        ef:{
            blow:[0,5,7,9,12,15],
            shot:[0,0,0,0,0,0],
            magical:[0,0,0,0,0,0],
            tech:[0,0,0,0,0,0]
        },
        label:["NA","1.05x","1.07x","1.09x","1.12x","1.15x"],
        default:5
    },
    {
        id:"comf",
        className:"Br",
        skillName:"Combat Finish",
        ef:{
            blow:[0,100,120,140,160,200],
            shot:[0,0,0,0,0,0],
            magical:[0,0,0,0,0,0],
            tech:[0,0,0,0,0,0]
        },
        label:["None","200%","220%","240%","260%","300%"]
    },
    {
        id:"rpup",
        className:"Br",
        skillName:"Rapid Shoot Up",
        ef:{
            blow:["0","0","0","0","0"],
            shot:["0","100","240","440","500"],
            magical:["0","0","0","0","0"],
            tech:["0","0","0","0","0"]
        },
        label:["NA","100 RATK","240","440","500 RATK"],
        default:4
    },
    {
        id:"rpm",
        className:"Br",
        skillName:"Rapid Shoot Mastery",
        ef:{
            blow:[0,15],
            shot:[0,15],
            magical:[0,0],
            tech:[0,15]
        },
        label:["NA","1.15x"],
        default:1
    },
    {
        id:"aa",
        className:"Br",
        skillName:"Attack Advance",
        ef:{
            blow:[0,35],
            shot:[0,35],
            magical:[0,35],
            tech:[0,35]
        },
        label:["NA","1.35x"]
    },
    {
        id:"cs",
        className:"Br",
        skillName:"Charge Shoot",
        ef:{
            blow:[0,0,0],
            shot:[0,9,15],
            magical:[0,0,0],
            tech:[0,0,0]
        },
        label:["NA","1.09x","1.15x"]
    },
    {
        id:"bos",
        className:"Bo",
        skillName:"Bouncer Stance",
        ef:{
            blow:[0,15,17.5,20,35],
            shot:[0,15,17.5,20,35],
            magical:[0,15,17.5,20,35],
            tech:[0,15,17.5,20,35]
        },
        label:["None","Elemental S. (Non-Weak)","SD Bonus","Elemental S.","Break S."],
        onlymain:2,
        default:3
    },
    {
        id:"bosup",
        className:"Bo",
        skillName:"Bo Stance Up",
        ef:{
            blow:[0,10],
            shot:[0,10],
            magical:[0,10],
            tech:[0,10]
        },
        label:["NA","1.1x"],
        default:1
    },
    {
        id:"pbfup",
        className:"Bo",
        skillName:"PB Fever & Fever Up",
        ef:{
            blow:[0,100,160],
            shot:[0,0,0],
            magical:[0,0,0],
            tech:[0,0,0]
        },
        label:["NA","PBF","PBF+Fever Up"]
    },
    {
        id:"rpja",
        className:"Bo",
        skillName:"Rapid Boost JA Bonus",
        ef:{
            blow:[0,15],
            shot:[0,15],
            magical:[0,0],
            tech:[0,15]
        },
        label:["NA","1.15x"]
    },
    {
        id:"sea",
        className:"Bo",
        skillName:"Shifta Air Attack Boost",
        ef:{
            blow:[0,5],
            shot:[0,5],
            magical:[0,5],
            tech:[0,5]
        },
        label:["NA","1.05x"],
        default:1
    },
    {
        id:"ae",
        className:"Su",
        skillName:"Alter Ego",
        ef:{
            blow:[0,0,0],
            shot:[0,0,0],
            magical:[0,15,20],
            tech:[0,15,20]
        },
        label:["NA","1.15x","1.2x"],
        onlymain:-1,
        default:1
    },
    {
        id:"pasf",
        className:"Su",
        skillName:"P.Assist & S.Fire",
        ef:{
            blow:[0,10,15,26.5],
            shot:[0,10,15,26.5],
            magical:[0,10,15,26,6],
            tech:[0,10,15,26.5]
        },
        label:["NA","1.1x (SF)","1.15x (PA)","1.265x (PA/SF)"],
        default:3
    },
    {
        id:"all",
        className:"Su",
        skillName:"All Attack Bonus 1/2",
        ef:{
            blow:[0,32.25],
            shot:[0,32.25],
            magical:[0,32.25],
            tech:[0,32.25]
        },
        label:["None","1.3225x"],
        default:1
    },
    {
        id:"ps",
        className:"Su",
        skillName:"Pet Sympathy",
        ef:{
            blow:[0,0],
            shot:[0,0],
            magical:[0,20],
            tech:[0,0]
        },
        label:["NA","1.2x"],
        onlymain:-1,
        default:1
    },
    {
        id:"pewh",
        className:"Su",
        skillName:"Pet Elemental Weak Hit",
        ef:{
            blow:[0,5],
            shot:[0,5],
            magical:[0,10],
            tech:[0,5]
        },
        label:["NA","1.05x (Player) / 1.1x (Pet)"]
    },
    {
        id:"hrt",
        className:"Hr",
        skillName:"Hero Time",
        ef:{
            blow:["0","999"],
            shot:["0","999"],
            magical:["0","999"],
            tech:["0","999"]
        },
        label:["NA","999 ATK"],
        onlymain:-1
    },
    {
        id:"hrct",
        className:"Hr",
        skillName:"Hero Counter",
        ef:{
            blow:[0,10],
            shot:[0,10],
            magical:[0,10],
            tech:[0,0]
        },
        label:["NA","1.1x"],
        onlymain:-1
    },
    {
        id:"hrb",
        className:"Hr",
        skillName:"Hero Boost",
        ef:{
            blow:[0,60],
            shot:[0,60],
            magical:[0,60],
            tech:[0,60]
        },
        label:["NA","1.6x"],
        onlymain:-1,
        default:1
    },
    {
        id:"hrwb",
        className:"Hr",
        skillName:"Hero Weapon Bonus 1/2",
        ef:{
            blow:[0,125],
            shot:[0,125],
            magical:[0,125],
            tech:[0,125]
        },
        label:["NA","2.25x"],
        onlymain:-1,
        default:1
    },
    {
        id:"hrab",
        className:"Hr",
        skillName:"Hero Attack Bonus",
        ef:{
            blow:[0,10],
            shot:[0,10],
            magical:[0,10],
            tech:[0,10]
        },
        label:["NA","1.1x"],
        onlymain:-1
    },
    {
        id:"ahc",
        className:"Hr",
        skillName:"Aura High Charge",
        ef:{
            blow:[0,5,7,9,10],
            shot:[0,0,0,0,0],
            magical:[0,0,0,0,0],
            tech:[0,0,0,0,0]
        },
        label:["None","1.05x","1.07x","1.09x","1.1x"],
        onlymain:-1
    }
]

var skillsId={};
for (var i=0;i<skills.length;i++){
    var key=skills[i].id
    skillsId[key]={
        className:skills[i].className,
        ef:skills[i].ef
    };
}

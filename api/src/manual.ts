export interface ManualSection {
  id: string;
  title: string;
  content: string;
}

export const manualSections: ManualSection[] = [
  // --- (1) Buildings ---
  {
    id: "5-1-buildings-fires",
    title: "Buildings: Start fires with inflammable materials",
    content:
      "Fires can be started wherever there is an accumulation of inflammable material. Warehouses are obviously the most promising targets but incendiary sabotage need not be confined to them alone.",
  },
  {
    id: "5-1-buildings-water",
    title: "Buildings: Ruin stock via sprinkler systems",
    content:
      "Ruin warehouse stock by setting the automatic sprinkler system to work. You can do this by tapping the sprinkler heads sharply with a hammer or by holding a match under them.",
  },
  {
    id: "5-1-buildings-plumbing",
    title: "Buildings: Clog toilets and sewage systems",
    content:
      "Forget to provide paper in toilets; put tightly rolled paper, hair, and other obstructions in the W.C. Saturate a sponge with a thick starch or sugar solution. Squeeze it tightly into a ball, wrap it with string, and dry. The sponge will gradually expand to its normal size and plug the sewage system.",
  },
  {
    id: "5-1-buildings-electrical",
    title: "Buildings: Short-circuit electrical systems",
    content:
      "Put a coin beneath a bulb in a public building during the daytime, so that fuses will blow out when lights are turned on at night. The fuses themselves may be rendered ineffective by putting a coin behind them or loading them with heavy wire.",
  },
  {
    id: "5-1-buildings-locks",
    title: "Buildings: Jam locks on entrances",
    content:
      "Jam paper, bits of wood, hairpins, and anything else that will fit, into the locks of all unguarded entrances to public buildings.",
  },

  // --- (2) Industrial Production: Manufacturing ---
  {
    id: "5-2-tools-dull",
    title: "Manufacturing: Let cutting tools grow dull",
    content:
      "Let cutting tools grow dull. They will be inefficient, will slow down production, and may damage the materials and parts you use them on.",
  },
  {
    id: "5-2-tools-twist",
    title: "Manufacturing: Leave saws twisted to break them",
    content:
      "Leave saws slightly twisted when you are not using them. After a while, they will break when used.",
  },
  {
    id: "5-2-tools-wear",
    title: "Manufacturing: Wear out files prematurely",
    content:
      "Using a very rapid stroke will wear out a file before its time. So will dragging a file in slow strokes under heavy pressure. Exert pressure on the backward stroke as well as the forward stroke.",
  },
  {
    id: "5-2-tools-dirty",
    title: "Manufacturing: Keep power tools dirty",
    content:
      "Power-driven tools like pneumatic drills, riveters, and so on, are never efficient when dirty. Lubrication points and electric contacts can easily be fouled by normal accumulations of dirt or the insertion of foreign matter.",
  },
  {
    id: "5-2-oil-contaminate",
    title: "Manufacturing: Contaminate lubrication systems",
    content:
      "Put metal dust or filings, fine sand, ground glass, emery dust and similar hard, gritty substances directly into lubrication systems. They will scour smooth surfaces, ruining pistons, cylinder walls, shafts, and bearings. They will overheat and stop motors which will need overhauling, new parts, and extensive repairs.",
  },
  {
    id: "5-2-oil-filter",
    title: "Manufacturing: Damage oil filters",
    content:
      "You can cause wear on any machine by uncovering a filter system, poking a pencil or any other sharp object through the filter mesh, then covering it up again. Or, if you can dispose of it quickly, simply remove the filter.",
  },
  {
    id: "5-2-oil-dilute",
    title: "Manufacturing: Dilute oil in storage",
    content:
      "If you cannot get at the lubrication system or filter directly, you may be able to lessen the effectiveness of oil by diluting it in storage. Almost any liquid will do which will thin the oil. A small amount of sulphuric acid, varnish, water-glass, or linseed oil will be especially effective.",
  },
  {
    id: "5-2-oil-wrong-weight",
    title: "Manufacturing: Use wrong oil weight",
    content:
      'Using a thin oil where a heavy oil is prescribed will break down a machine or heat up a moving shaft so that it will "freeze" and stop.',
  },
  {
    id: "5-2-oil-clog",
    title: "Manufacturing: Clog lubrication systems",
    content:
      "Put any clogging substance into lubrication systems or, if it will float, into stored oil. Twisted combings of human hair, pieces of string, dead insects, and many other common objects will be effective in stopping or hindering the flow of oil through feed lines and filters.",
  },
  {
    id: "5-2-cooling-grain",
    title: "Manufacturing: Clog water cooling systems with grain",
    content:
      "A water cooling system can be put out of commission in a fairly short time, with considerable damage to an engine or motor, if you put into it several pinches of hard grain, such as rice or wheat. They will swell up and choke the circulation of water.",
  },
  {
    id: "5-2-cooling-cold-water",
    title: "Manufacturing: Crack engines with cold water",
    content:
      "If very cold water is quickly introduced into the cooling system of an overheated motor, contraction and considerable strain on the engine housing will result. If you can repeat the treatment a few times, cracking and serious damage will result.",
  },
  {
    id: "5-2-cooling-air",
    title: "Manufacturing: Block air cooling systems",
    content:
      "You can ruin the effectiveness of an air cooling system by plugging dirt and waste into intake or exhaust valves. If a belt-run fan is used in the system, make a jagged cut at least half way through the belt; it will slip and finally part under strain and the motor will overheat.",
  },
  {
    id: "5-2-fuel-clog",
    title: "Manufacturing: Clog fuel tanks with debris",
    content:
      "Put several pinches of sawdust or hard grain, such as rice or wheat, into the fuel tank of a gasoline engine. The particles will choke a feed line so that the engine will stop.",
  },
  {
    id: "5-2-fuel-sugar",
    title: "Manufacturing: Put sugar in fuel tanks",
    content:
      "If you can accumulate sugar, put it in the fuel tank of a gasoline engine. As it burns together with the gasoline, it will turn into a sticky mess which will completely mire the engine and necessitate extensive cleaning and repair. Honey and molasses are as good as sugar.",
  },
  {
    id: "5-2-fuel-dilute",
    title: "Manufacturing: Dilute gasoline with water",
    content:
      "Water, urine, wine, or any other simple liquid you can get in reasonably large quantities will dilute gasoline fuel to a point where no combustion will occur in the cylinder and the engine will not move. One pint to 20 gallons of gasoline is sufficient.",
  },
  {
    id: "5-2-electric-overheat",
    title: "Manufacturing: Overheat electric motors",
    content:
      "Set the rheostat to a high point of resistance in all types of electric motors. They will overheat and catch fire. Adjust the overload relay to a very high value beyond the capacity of the motor.",
  },
  {
    id: "5-2-electric-dirty",
    title: "Manufacturing: Dirty electrical equipment",
    content:
      "Remember that dust, dirt, and moisture are enemies of electrical equipment. Spill dust and dirt onto the points where the wires in electric motors connect with terminals, and onto insulating parts. Inefficient transmission of current and, in some cases, short circuits will result.",
  },
  {
    id: "5-2-electric-insulation",
    title: 'Manufacturing: "Accidentally" damage wire insulation',
    content:
      '"Accidentally" bruise the insulation on wire, loosen nuts on connections, make faulty splices and faulty connections in wiring, to waste electric current and reduce the power of electric motors.',
  },
  {
    id: "5-2-transformers",
    title: "Manufacturing: Sabotage transformers",
    content:
      "Transformers of the oil-filled type can be put out of commission if you pour water, salt water, machine tool coolant, or kerosene into the oil tank. In air-cooled transformers, block the ventilation by piling debris around the transformer.",
  },
  {
    id: "5-2-turbines",
    title: "Manufacturing: Sabotage turbines",
    content:
      "After inspecting or repairing a hydro turbine, fasten the cover insecurely so that it will blow off and flood the plant with water. When the steam line to a turbine is opened for repair, put pieces of scrap iron into it.",
  },
  {
    id: "5-2-boilers",
    title: "Manufacturing: Reduce boiler efficiency",
    content:
      "Reduce the efficiency of steam boilers any way you can. Put too much water in them to make them slow-starting, or keep the fire under them low to keep them inefficient. Let them dry and turn the fire up; they will crack and be ruined. An especially good trick is to keep putting limestone or water containing lime in the boiler.",
  },

  // --- (3) Production: Metals ---
  {
    id: "5-3-metals-furnace",
    title: "Metals: Sabotage blast furnaces",
    content:
      "Keep blast furnaces in a condition where they must be frequently shut down for repair. In making fire-proof bricks for the inner lining of blast furnaces, put in an extra proportion of tar so that they will wear out quickly.",
  },
  {
    id: "5-3-metals-casting",
    title: "Metals: Ruin castings with air bubbles",
    content:
      "Make cores for casting so that they are filled with air bubbles and an imperfect cast results. See that the core in a mold is not properly supported, so that the core gives way or the casting is spoiled.",
  },
  {
    id: "5-3-metals-tempering",
    title: "Metals: Apply too much heat when tempering",
    content:
      "In tempering steel or iron, apply too much heat, so that the resulting bars and ingots are of poor quality.",
  },

  // --- (4) Production: Mining ---
  {
    id: "5-4-mining-lamp",
    title: "Mining: Extinguish Davy lamp and waste time relighting",
    content:
      "A slight blow against your Davy oil lamp will extinguish it, and to light it again you will have to find a place where there is no fire damp. Take a long time looking for the place.",
  },
  {
    id: "5-4-mining-picks",
    title: "Mining: Don't harden pneumatic picks properly",
    content:
      "Blacksmiths who make pneumatic picks should not harden them properly, so that they will quickly grow dull.",
  },
  {
    id: "5-4-mining-chain",
    title: "Mining: Weaken conveyor chains",
    content:
      "Weaken the chain that pulls the bucket conveyers carrying coal. A deep dent in the chain made with blows of a pick or shovel will cause it to part under normal strain. Once a chain breaks, take your time about reporting the damage.",
  },
  {
    id: "5-4-mining-derail",
    title: "Mining: Derail mine cars",
    content:
      "Derail mine cars by putting obstructions on the rails and in switch points. If possible, pick a gallery where coal cars have to pass each other, so that traffic will be snarled up.",
  },
  {
    id: "5-4-mining-rock",
    title: "Mining: Send useless material with coal",
    content:
      "Send up quantities of rock and other useless material with the coal.",
  },

  // --- (5) Production: Agriculture ---
  {
    id: "5-5-agriculture-crops",
    title: "Agriculture: Spoil crops and harvests",
    content:
      "Feed crops to livestock. Let crops harvest too early or too late. Spoil stores of grain, fruit and vegetables by soaking them in water so that they will rot. Spoil fruit and vegetables by leaving them in the sun.",
  },

  // --- (6) Transportation: Railways ---
  {
    id: "5-6-rail-tickets",
    title: "Railways: Make ticketing mistakes and delays",
    content:
      "Make train travel as inconvenient as possible for enemy personnel. Make mistakes in issuing train tickets, leaving portions of the journey uncovered by the ticket book; issue two tickets for the same seat in the train, so that an interesting argument will result; near train time, instead of issuing printed tickets write them out slowly by hand.",
  },
  {
    id: "5-6-rail-uncomfortable",
    title: "Railways: Make train travel uncomfortable",
    content:
      "In trains bound for enemy destinations, attendants should make life as uncomfortable as possible for passengers. See that the food is especially bad, take up tickets after midnight, call all station stops very loudly during the night, handle baggage as noisily as possible during the night.",
  },
  {
    id: "5-6-rail-luggage",
    title: "Railways: Mislay luggage and switch labels",
    content:
      "See that the luggage of enemy personnel is mislaid or unloaded at the wrong stations. Switch address labels on enemy baggage.",
  },
  {
    id: "5-6-rail-slow",
    title: "Railways: Run trains slowly with unscheduled stops",
    content:
      "Engineers should see that trains run slow or make unscheduled stops for plausible reasons.",
  },
  {
    id: "5-6-rail-signals",
    title: "Railways: Sabotage switches and signals",
    content:
      "Exchange wires in switchboards containing signals and switches, so that they connect to the wrong terminals. Loosen push-rods so that signal arms do not work; break signal lights; exchange the colored lenses on red and green lights.",
  },
  {
    id: "5-6-rail-wrong-cars",
    title: "Railways: Put cars on wrong trains",
    content:
      "See that cars are put on the wrong trains. Remove the labels from cars needing repair and put them on cars in good order. Leave couplings between cars as loose as possible.",
  },
  {
    id: "5-6-rail-brakes",
    title: "Railways: Abuse brakes and engines",
    content:
      "Engines should run at high speeds and use brakes excessively at curves and on downhill grades. Punch holes in air-brake valves or water supply pipes.",
  },

  // --- (7) Transportation: Automotive ---
  {
    id: "5-7-auto-signs",
    title: "Automotive: Change road signs and give wrong directions",
    content:
      "Change sign posts at intersections and forks; the enemy will go the wrong way and it may be miles before he discovers his mistakes. When the enemy asks for directions, give him wrong information.",
  },
  {
    id: "5-7-auto-roads",
    title: "Automotive: Damage roads",
    content:
      "If you can start damage to a heavily traveled road, passing traffic and the elements will do the rest. Construction gangs can see that too much sand or water is put in concrete or that the road foundation has soft spots. Anyone can scoop ruts in asphalt and macadam roads which turn soft in hot weather.",
  },
  {
    id: "5-7-auto-nails",
    title: "Automotive: Distribute nails and glass on roads",
    content:
      "Distribute broken glass, nails, and sharp rocks on roads to puncture tires.",
  },
  {
    id: "5-7-auto-bus",
    title: "Automotive: Bus drivers go past stops, taxi drivers take long routes",
    content:
      "Bus-driver can go past the stop where the enemy wants to get off. Taxi drivers can waste the enemy's time and make extra money by driving the longest possible route to his destination.",
  },
  {
    id: "5-7-auto-battery",
    title: "Automotive: Sabotage batteries and ignition",
    content:
      "Jam bits of wood into the ignition lock; loosen or exchange connections behind the switchboard; put dirt in spark plugs; damage distributor points. Turn on the lights in parked cars so that the battery will run down.",
  },
  {
    id: "5-7-auto-tires-slash",
    title: "Automotive: Slash or puncture tires",
    content:
      "Slash or puncture tires of unguarded vehicles. Put a nail inside a match box or other small box, and set it vertically in front of the back tire of a stationary car; when the car starts off, the nail will go neatly through the tire.",
  },
  {
    id: "5-7-auto-tires-repair",
    title: "Automotive: Sabotage tire repairs",
    content:
      "In fixing flats, spill glass, benzine, caustic soda, or other material inside the casing which will puncture or corrode the tube. If you put a gummy substance inside the tube, the next flat will stick the tube to the casing and make it unusable.",
  },
  {
    id: "5-7-auto-tires-pressure",
    title: "Automotive: Under-inflate or misalign tires",
    content:
      "In putting air into tires, see that they are kept below normal pressure, so that more than an ordinary amount of wear will result. Badly aligned wheels also wear tires out quickly; you can leave wheels out of alignment when they come in for adjustment.",
  },
  {
    id: "5-7-auto-gears",
    title: "Automotive: Sabotage gears and transmissions",
    content:
      "Remove the lubricant from or put too light a lubricant in the transmission and other gears. In trucks and machines with heavy gears, fix the gear case insecurely, putting bolts in only half the bolt holes.",
  },

  // --- (8) Transportation: Water ---
  {
    id: "5-8-water-rumors",
    title: "Water Transport: Spread false navigation rumors",
    content:
      "Barge and river boat personnel should spread false rumors about the navigability and conditions of the waterways they travel. Tell other barge and boat captains to follow channels that will take extra time.",
  },
  {
    id: "5-8-water-slow",
    title: "Water Transport: Navigate with excessive caution to waste time",
    content:
      'Barge and river boat captains should navigate with exceeding caution near locks and bridges, to waste their time and to waste the time of other craft. If you don\'t pump the bilges of ships and barges often enough, they will be slower and harder to navigate. Barges "accidentally" run aground are an efficient time waster too.',
  },
  {
    id: "5-8-water-bridges",
    title: "Water Transport: Delay traffic at bridges",
    content:
      "Attendants on swing, draw, or bascule bridges can delay traffic over the bridge or in the waterway underneath by being slow. Boat captains can leave unattended draw bridges open in order to hold up road traffic.",
  },
  {
    id: "5-8-water-compass",
    title: "Water Transport: Tamper with ship compasses",
    content:
      "Add or subtract compensating magnets to the compass on cargo ships. Demagnetize the compass or maladjust it by concealing a large bar of steel or iron near to it.",
  },
  {
    id: "5-8-water-cargo",
    title: "Water Transport: Handle cargo carelessly",
    content:
      "While loading or unloading, handle cargo carelessly in order to cause damage. Arrange the cargo so that the weakest and lightest crates and boxes will be at the bottom of the hold, while the heaviest ones are on top of them. Put hatch covers and tarpaulins on sloppily.",
  },

  // --- (9) Communications ---
  {
    id: "5-9-telephone-delay",
    title: "Communications: Delay and misdirect phone calls",
    content:
      'At office, hotel and exchange switchboards delay putting enemy calls through, give them wrong numbers, cut them off "accidentally," or forget to disconnect them so that the line cannot be used again.',
  },
  {
    id: "5-9-telephone-false",
    title: "Communications: Make false telephone reports",
    content:
      "Hamper official and especially military business by making at least one telephone call a day to an enemy headquarters; when you get them, tell them you have the wrong number. Call military or police offices and make anonymous false reports.",
  },
  {
    id: "5-9-telephone-damage",
    title: "Communications: Damage telephone equipment",
    content:
      "In offices and buildings used by the enemy, unscrew the earphone of telephone receivers and remove the diaphragm. Electricians and telephone repair men can make poor connections and damage insulation so that cross-talk will make conversations hard or impossible to understand.",
  },
  {
    id: "5-9-telegraph-garble",
    title: "Communications: Delay and garble telegrams",
    content:
      'Delay the transmission and delivery of telegrams to enemy destinations. Garble telegrams so that another telegram will have to be sent or a long distance call will have to be made. Sometimes it will be possible to do this by changing a single letter in a word—for example, changing "minimum" to "miximum."',
  },
  {
    id: "5-9-mail-delay",
    title: "Communications: Delay and misdirect mail",
    content:
      "Post office employees can see to it that enemy mail is always delayed by one day or more, that it is put in wrong sacks, and so on.",
  },
  {
    id: "5-9-film-sabotage",
    title: "Communications: Ruin film projections",
    content:
      "Projector operators can ruin newsreels and other enemy propaganda films by bad focusing, speeding up or slowing down the film and by causing frequent breakage in the film.",
  },
  {
    id: "5-9-radio-overmodulate",
    title: "Communications: Overmodulate radio transmissions",
    content:
      "Station engineers will find it quite easy to overmodulate transmissions of talks by persons giving enemy propaganda or instructions, so that they will sound as if they were talking through a heavy cotton blanket with a mouth full of marbles.",
  },

  // --- (10) Electric Power ---
  {
    id: "5-10-power-lines",
    title: "Electric Power: Sabotage transmission lines",
    content:
      "Linesmen can loosen and dirty insulators to cause power leakage. It will be quite easy for them to tie a piece of very heavy string several times back and forth between two parallel transmission lines. The string should be heavily saturated with salt and then dried. When it rains, the string becomes a conductor, and a short-circuit will result.",
  },

  // --- (11) General Interference with Organizations and Production ---
  // (a) Organizations and Conferences
  {
    id: "11-orgs-channels",
    title: "Organizations: Insist on doing everything through channels",
    content:
      'Insist on doing everything through "channels." Never permit short-cuts to be taken in order to expedite decisions.',
  },
  {
    id: "11-orgs-speeches",
    title: "Organizations: Make speeches and talk at length",
    content:
      'Make "speeches." Talk as frequently as possible and at great length. Illustrate your "points" by long anecdotes and accounts of personal experiences. Never hesitate to make a few appropriate "patriotic" comments.',
  },
  {
    id: "11-orgs-committees",
    title: "Organizations: Refer matters to committees",
    content:
      'When possible, refer all matters to committees, for "further study and consideration." Attempt to make the committees as large as possible — never less than five.',
  },
  {
    id: "11-orgs-irrelevant",
    title: "Organizations: Bring up irrelevant issues",
    content: "Bring up irrelevant issues as frequently as possible.",
  },
  {
    id: "11-orgs-wordings",
    title: "Organizations: Haggle over precise wordings",
    content:
      "Haggle over precise wordings of communications, minutes, resolutions.",
  },
  {
    id: "11-orgs-reopen",
    title: "Organizations: Re-open previously decided matters",
    content:
      "Refer back to matters decided upon at the last meeting and attempt to re-open the question of the advisability of that decision.",
  },
  {
    id: "11-orgs-caution",
    title: 'Organizations: Advocate "caution"',
    content:
      'Advocate "caution." Be "reasonable" and urge your fellow-conferees to be "reasonable" and avoid haste which might result in embarrassments or difficulties later on.',
  },
  {
    id: "11-orgs-propriety",
    title: "Organizations: Question the propriety of decisions",
    content:
      "Be worried about the propriety of any decision—raise the question of whether such action as is contemplated lies within the jurisdiction of the group or whether it might conflict with the policy of some higher echelon.",
  },

  // (b) Managers and Supervisors
  {
    id: "11-mgr-written-orders",
    title: "Managers: Demand written orders",
    content: "Demand written orders.",
  },
  {
    id: "11-mgr-misunderstand",
    title: 'Managers: "Misunderstand" orders',
    content:
      '"Misunderstand" orders. Ask endless questions or engage in long correspondence about such orders. Quibble over them when you can.',
  },
  {
    id: "11-mgr-delay-delivery",
    title: "Managers: Delay delivery of orders",
    content:
      "Do everything possible to delay the delivery of orders. Even though parts of an order may be ready beforehand, don't deliver it until it is completely ready.",
  },
  {
    id: "11-mgr-exhaust-stocks",
    title: "Managers: Wait until stocks are exhausted to reorder",
    content:
      "Don't order new working materials until your current stocks have been virtually exhausted, so that the slightest delay in filling your order will mean a shutdown.",
  },
  {
    id: "11-mgr-high-quality",
    title: "Managers: Order hard-to-get high-quality materials",
    content:
      "Order high-quality materials which are hard to get. If you don't get them argue about it. Warn that inferior materials will mean inferior work.",
  },
  {
    id: "11-mgr-bad-assignments",
    title: "Managers: Assign important jobs to inefficient workers",
    content:
      "In making work assignments, always sign out the unimportant jobs first. See that the important jobs are assigned to inefficient workers or poor machines.",
  },
  {
    id: "11-mgr-perfectionism",
    title: "Managers: Insist on perfect work for unimportant things",
    content:
      "Insist on perfect work in relatively unimportant products; send back for refinishing those which have the least flaw. Approve other defective parts whose flaws are not visible to the naked eye.",
  },
  {
    id: "11-mgr-misroute",
    title: "Managers: Make routing mistakes",
    content:
      "Make mistakes in routing so that parts and materials will be sent to the wrong place in the plant.",
  },
  {
    id: "11-mgr-bad-training",
    title: "Managers: Give incomplete or misleading training",
    content:
      "When training new workers, give incomplete or misleading instructions.",
  },
  {
    id: "11-mgr-morale",
    title: "Managers: Reward inefficiency, punish efficiency",
    content:
      "To lower morale and with it, production, be pleasant to inefficient workers; give them undeserved promotions. Discriminate against efficient workers; complain unjustly about their work.",
  },
  {
    id: "11-mgr-conferences",
    title: "Managers: Hold conferences when there is critical work",
    content:
      "Hold conferences when there is more critical work to be done.",
  },
  {
    id: "11-mgr-paperwork",
    title: "Managers: Multiply paperwork",
    content:
      "Multiply paper work in plausible ways. Start duplicate files.",
  },
  {
    id: "11-mgr-approvals",
    title: "Managers: Multiply procedures and clearances",
    content:
      "Multiply the procedures and clearances involved in issuing instructions, pay checks, and so on. See that three people have to approve everything where one would do.",
  },
  {
    id: "11-mgr-regulations",
    title: "Managers: Apply all regulations to the last letter",
    content: "Apply all regulations to the last letter.",
  },

  // (c) Office Workers
  {
    id: "11-office-mistakes",
    title: "Office Workers: Make mistakes in quantities and names",
    content:
      "Make mistakes in quantities of material when you are copying orders. Confuse similar names. Use wrong addresses.",
  },
  {
    id: "11-office-correspondence",
    title: "Office Workers: Prolong correspondence",
    content: "Prolong correspondence with government bureaus.",
  },
  {
    id: "11-office-misfile",
    title: "Office Workers: Misfile essential documents",
    content: "Misfile essential documents.",
  },
  {
    id: "11-office-copies",
    title: "Office Workers: Make too few copies",
    content:
      "In making carbon copies, make one too few, so that an extra copying job will have to be done.",
  },
  {
    id: "11-office-callers",
    title: "Office Workers: Tell callers the boss is busy",
    content:
      "Tell important callers the boss is busy or talking on another telephone.",
  },
  {
    id: "11-office-mail",
    title: "Office Workers: Hold up mail",
    content: "Hold up mail until the next collection.",
  },
  {
    id: "11-office-rumors",
    title: "Office Workers: Spread disturbing rumors",
    content: "Spread disturbing rumors that sound like inside dope.",
  },

  // (d) Employees
  {
    id: "11-emp-slow",
    title: "Employees: Work slowly",
    content:
      "Work slowly. Think out ways to increase the number of movements necessary on your job: use a light hammer instead of a heavy one, try to make a small wrench do when a big one is necessary, use little force where considerable force is needed, and so on.",
  },
  {
    id: "11-emp-interruptions",
    title: "Employees: Contrive interruptions to your work",
    content:
      "Contrive as many interruptions to your work as you can: when changing the material on which you are working, take needless time to do it. If you are cutting, shaping or doing other measured work, measure dimensions twice as often as you need to. When you go to the lavatory, spend a longer time there than is necessary. Forget tools so that you will have to go back after them.",
  },
  {
    id: "11-emp-language",
    title: "Employees: Pretend not to understand instructions",
    content:
      "Even if you understand the language, pretend not to understand instructions in a foreign tongue.",
  },
  {
    id: "11-emp-repeat",
    title: "Employees: Ask to have instructions repeated",
    content:
      "Pretend that instructions are hard to understand, and ask to have them repeated more than once. Or pretend that you are particularly anxious to do your work, and pester the foreman with unnecessary questions.",
  },
  {
    id: "11-emp-blame-tools",
    title: "Employees: Do poor work and blame bad tools",
    content:
      "Do your work poorly and blame it on bad tools, machinery, or equipment. Complain that these things are preventing you from doing your job right.",
  },
  {
    id: "11-emp-hoard-skill",
    title: "Employees: Never pass on skill and experience",
    content:
      "Never pass on your skill and experience to a new or less skillful worker.",
  },
  {
    id: "11-emp-admin",
    title: "Employees: Snarl up administration",
    content:
      "Snarl up administration in every possible way. Fill out forms illegibly so that they will have to be done over; make mistakes or omit requested information in forms.",
  },
  {
    id: "11-emp-grievances",
    title: "Employees: Organize inconvenient grievance procedures",
    content:
      "If possible, join or help organize a group for presenting employee problems to the management. See that the procedures adopted are as inconvenient as possible for the management, involving the presence of a large number of employees at each presentation, entailing more than one meeting for each grievance, bringing up problems which are largely imaginary, and so on.",
  },
  {
    id: "11-emp-misroute",
    title: "Employees: Misroute materials",
    content: "Misroute materials.",
  },
  {
    id: "11-emp-mix-parts",
    title: "Employees: Mix good parts with scrap",
    content: "Mix good parts with unusable scrap and rejected parts.",
  },

  // --- (12) General Devices for Lowering Morale and Creating Confusion ---
  {
    id: "12-incomprehensible",
    title: "Morale: Give lengthy, incomprehensible explanations",
    content:
      "Give lengthy and incomprehensible explanations when questioned.",
  },
  {
    id: "12-stupid",
    title: "Morale: Act stupid",
    content: "Act stupid.",
  },
  {
    id: "12-quarrelsome",
    title: "Morale: Be irritable and quarrelsome",
    content:
      "Be as irritable and quarrelsome as possible without getting yourself into trouble.",
  },
  {
    id: "12-misunderstand-regs",
    title: "Morale: Misunderstand regulations",
    content:
      "Misunderstand all sorts of regulations concerning such matters as rationing, transportation, traffic regulations.",
  },
  {
    id: "12-complain",
    title: "Morale: Complain about materials",
    content: "Complain against ersatz materials.",
  },
  {
    id: "12-cold-treatment",
    title: "Morale: Treat collaborators coldly in public",
    content:
      "In public treat axis nationals or quislings coldly.",
  },
  {
    id: "12-stop-conversation",
    title: "Morale: Stop conversation when collaborators enter",
    content:
      "Stop all conversation when axis nationals or quislings enter a cafe.",
  },
  {
    id: "12-cry",
    title: "Morale: Cry and sob hysterically at every occasion",
    content:
      "Cry and sob hysterically at every occasion, especially when confronted by government clerks.",
  },
  {
    id: "12-boycott",
    title: "Morale: Boycott enemy entertainment and media",
    content:
      "Boycott all movies, entertainments, concerts, newspapers which are in any way connected with the quisling authorities.",
  },
  {
    id: "12-no-salvage",
    title: "Morale: Do not cooperate in salvage schemes",
    content: "Do not cooperate in salvage schemes.",
  },
];

export function getFullManualText(): string {
  return `# OSS Simple Sabotage Field Manual - Sections 5-12: Specific Suggestions for Simple Sabotage

## (5) Specific Suggestions for Simple Sabotage

### (1) Buildings
- Fires can be started wherever there is an accumulation of inflammable material.
- Ruin warehouse stock by setting the automatic sprinkler system to work.
- Clog toilets and sewage systems with sponges soaked in starch solution.
- Put coins beneath bulbs to blow fuses; jam locks on entrances.

### (2) Industrial Production: Manufacturing
#### (a) Tools
- Let cutting tools grow dull to slow production and damage materials.
- Leave saws slightly twisted; they will break when used.
- Wear out files prematurely with rapid strokes or heavy pressure.
- Keep power-driven tools dirty; foul lubrication points and electric contacts.

#### (b) Oil and Lubrication
- Put metal dust, sand, ground glass, or emery dust into lubrication systems.
- Poke holes in filter mesh; dilute oil with acid, varnish, or linseed oil.
- Use wrong weight oil; clog systems with hair, string, or dead insects.

#### (c) Cooling Systems
- Put rice or wheat into water cooling systems to swell and choke circulation.
- Introduce cold water into overheated motors to crack engine housing.
- Block air cooling intakes; cut fan belts partway through.

#### (d) Gasoline and Oil Fuel
- Put sawdust, grain, or rubber into fuel tanks to choke feed lines.
- Put sugar, honey, or molasses in gasoline tanks.
- Dilute gasoline with water, urine, or wine. Put sand or glass in tanks.

#### (e) Electric Motors
- Set rheostats high to overheat motors. Adjust overload relays too high.
- Dirty electrical connections; bruise wire insulation; make faulty splices.
- Damage commutators, slip-rings, and armatures with dust, grease, or emery.

#### (f) Transformers
- Pour water or kerosene into oil-filled transformers. Block air-cooled transformer ventilation.

#### (g) Turbines
- Fasten turbine covers insecurely. Insert scrap iron into penstocks or steam lines.

#### (h) Boilers
- Reduce efficiency with too much water or too little fire. Put limestone in boilers.

### (3) Production: Metals
- Keep blast furnaces needing frequent repair. Use extra tar in firebricks.
- Make imperfect castings with air bubbles or improperly supported cores.
- Apply too much heat when tempering steel or iron.

### (4) Production: Mining
- Extinguish Davy lamps and take long time relighting.
- Don't harden pneumatic picks properly. Put water in oil levers.
- Weaken conveyor chains; derail mine cars; send rock up with coal.

### (5) Production: Agriculture
- Feed crops to livestock. Harvest too early or late. Spoil stores by soaking in water.

### (6) Transportation: Railways
#### (a) Passengers
- Make ticketing mistakes; issue duplicate seat tickets; write tickets slowly by hand.
- Make train travel uncomfortable: bad food, noisy baggage handling, midnight ticket checks.
- Mislay luggage; switch address labels; unload at wrong stations.
- Run trains slow; make unscheduled stops.

#### (b) Switches, Signals, Routing
- Exchange signal wires; loosen push-rods; swap red and green lenses.
- Put cars on wrong trains; leave couplings loose.

#### (c) Road-beds
- Remove bolts from tie-plates on curves; spread rail sections.

#### (d-i) Mechanical
- Squeeze lubricating pipes; clog cooling systems; contaminate fuel.
- Run engines at high speed with excessive braking; punch holes in air-brake valves.

### (7) Transportation: Automotive
- Change road signs; give wrong directions; spread false rumors about bridges and detours.
- Damage roads: put too much sand in concrete, scoop ruts, divert streams onto roads.
- Distribute broken glass, nails, and rocks to puncture tires.
- Bus drivers go past stops; taxi drivers take longest routes.
- Jam ignition locks; dirty spark plugs; drain batteries by leaving lights on.
- Slash tires; sabotage repairs; under-inflate; misalign wheels.
- Remove gear lubricant; fix gear cases insecurely.

### (8) Transportation: Water
- Spread false navigation rumors; navigate with excessive caution to waste time.
- Run barges aground "accidentally"; delay at bridges by being slow.
- Tamper with ship compasses. Handle cargo carelessly; stack weakest crates on bottom.

### (9) Communications
#### (a) Telephone
- Delay calls; give wrong numbers; cut off "accidentally"; forget to disconnect.
- Make false reports by phone. Remove earphone diaphragms; make poor connections.

#### (b) Telegraph
- Delay and garble telegrams. Change single letters to cause confusion.

#### (c) Mail
- Delay enemy mail by one day or more; put in wrong sacks.

#### (d) Motion Pictures
- Ruin films by bad focusing, wrong speed, frequent breakage.

#### (e) Radio
- Overmodulate enemy propaganda transmissions.

### (10) Electric Power
- Loosen and dirty insulators. Tie salt-saturated string between transmission lines.

## (11) General Interference with Organizations and Production

### (a) Organizations and Conferences
1. Insist on doing everything through "channels." Never permit short-cuts.
2. Make "speeches." Talk as frequently as possible and at great length.
3. Refer all matters to committees for "further study." Make committees as large as possible.
4. Bring up irrelevant issues as frequently as possible.
5. Haggle over precise wordings of communications, minutes, resolutions.
6. Re-open previously decided matters and question those decisions.
7. Advocate "caution." Urge everyone to be "reasonable" and avoid haste.
8. Question the propriety of any decision — does it conflict with higher echelon policy?

### (b) Managers and Supervisors
1. Demand written orders.
2. "Misunderstand" orders. Ask endless questions; quibble when you can.
3. Delay delivery of orders until everything is completely ready.
4. Don't reorder materials until stocks are virtually exhausted.
5. Order hard-to-get high-quality materials; argue if you don't get them.
6. Assign important jobs to inefficient workers or poor machines.
7. Insist on perfection for unimportant products; overlook flaws in important ones.
8. Make routing mistakes; send materials to the wrong place.
9. Give incomplete or misleading training to new workers.
10. Reward inefficient workers with promotions; discriminate against efficient ones.
11. Hold conferences when there is more critical work to be done.
12. Multiply paperwork. Start duplicate files.
13. Require three approvals where one would do.
14. Apply all regulations to the last letter.

### (c) Office Workers
1. Make mistakes in quantities and names. Use wrong addresses.
2. Prolong correspondence.
3. Misfile essential documents.
4. Make too few copies so extra copying is needed.
5. Tell important callers the boss is busy.
6. Hold up mail until the next collection.
7. Spread disturbing rumors that sound like inside dope.

### (d) Employees
1. Work slowly. Increase the number of movements necessary for your job.
2. Contrive as many interruptions as you can.
3. Pretend not to understand instructions.
4. Ask to have instructions repeated; pester with unnecessary questions.
5. Do poor work and blame it on bad tools.
6. Never pass on your skill and experience to others.
7. Snarl up administration; fill out forms illegibly; omit information.
8. Organize inconvenient grievance procedures.
9. Misroute materials.
10. Mix good parts with unusable scrap.

## (12) General Devices for Lowering Morale and Creating Confusion
(a) Give lengthy and incomprehensible explanations when questioned.
(b) Act stupid.
(c) Be as irritable and quarrelsome as possible without getting into trouble.
(d) Misunderstand all sorts of regulations.
(e) Complain against ersatz materials.
(f) Treat collaborators coldly in public.
(g) Stop conversation when collaborators enter.
(h) Cry and sob hysterically at every occasion.
(i) Boycott enemy entertainment and media.
(j) Do not cooperate in salvage schemes.`;
}

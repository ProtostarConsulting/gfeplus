var app = angular.module("prostudyApp");

app.constant('boardList', [ "State Board", "CBSE", "ICSE" ]);
app.constant('standardList', [ "5th", "6th", "7th", "8th", "9th", "10th",
		"11th", "12th", "FY", "SY", "TY", "Fr. Y", "PG/D. & B. Ed-1", "PG/D. & B. Ed-2", "Teacher" ]);
app.constant('answerOfMediumList', [ "Marathi", "Hindi", "English" ]);
app.constant('logisticsList', [ "By Post", "By Hand", "ST Postal",
		"Tej Courier", "Other" ]);
app.constant('courierTypelist', [ "Book", "Certificate", "Error Certificate",
		"Error books", "Prize Certificate", "Other" ]);
app.constant('installmentList', [ 1, 2, 3 ]);
app.constant('partnerSchoolLevels', [ "School & Junior College",
		"Jr.& Sr. College", "D.Ed College", "Prison", "B.Ed College", "MBBS",
		"Nurses Course", "Engineearing", "All" ]);


app.constant("indiaAddressLookupData", {
		states : [ {
			name : "Maharashtra",
			districts : [ {
				name : "Ahmednagar",
				talukas : [ {
					name : "Akola"
				}, {
					name : "Sangamner"
				}, {
					name : "Kopargaon"
				}, {
					name : "Rahta"
				}, {
					name : "Shrirampur"
				}, {
					name : "Nevasa"
				}, {
					name : "Shevgaon",
					villages : [ {
						name : "Wagholi"
					}, {
						name : "Vadule Khurd"
					}, {
						name : "Jalgaon"
					}, {
						name : "Malegaon"
					}, {
						name : "Samangaon"
					}, {
						name : "Avhane"
					}, {
						name : "Shevgaon"
					}, {
						name : "Varur"
					}, {
						name : "Bhagur"
					}, {
						name : "Bodhegaon"
					}, {
						name : "Hatgaon"
					}, {
						name : "KamPimpri"
					}, {
						name : "Vadule Budruk"
					}, {
						name : "Varkhed"
					} ]
				}, {
					name : "Chapadgaon"
				}, {
					name : "Nagar"
				}, {
					name : "Rahuri"
				}, {
					name : "Parner"
				}, {
					name : "Pathardi"
				}, {
					name : "Shrigonda"
				}, {
					name : "Karjat"
				}, {
					name : "Jamkhed"
				} ]
			}, {
				name : "Akola",
				talukas : [ {
					name : "Akola"
				}, {
					name : "Akot"
				}, {
					name : "Balapur"
				}, {
					name : "Murtijapur"
				}, {
					name : "Telhara"
				}, {
					name : "Barshitakli"
				}, {
					name : "Patur"
				} ]
			}, {
				name : "Amravati",
				talukas : [ {
					name : "Dharni"
				}, {
					name : "Chikhaldara"
				}, {
					name : "Anjangaon Surji"
				}, {
					name : "Achalpur"
				}, {
					name : "Chandurbazar"
				}, {
					name : "Morshi"
				}, {
					name : "Warud"
				}, {
					name : "Teosa"
				}, {
					name : "Amravati"
				}, {
					name : "Bhatkuli"
				}, {
					name : "Daryapur"
				}, {
					name : "Nandgaon-Khandeshwar"
				}, {
					name : "Chandur Railway"
				}, {
					name : "Dhamangaon Railway"
				} ]
			},

			{
				name : "Aurangabad",
				talukas : [ {
					name : "Kannad"
				}, {
					name : "Soegaon"
				}, {
					name : "Sillod"
				}, {
					name : "Phulambri"
				}, {
					name : "Aurangabad"
				}, {
					name : "Khuldabad"
				}, {
					name : "Vaijapur"
				}, {
					name : "Gangapur"
				}, {
					name : "Paithan"
				} ]
			},

			{
				name : "Beed",
				talukas : [ {
					name : "Ashti"
				}, {
					name : "Patoda"
				}, {
					name : "Shirur (Kasar)"
				}, {
					name : "Georai"
				}, {
					name : "Manjlegaon"
				}, {
					name : "Wadwani"
				}, {
					name : "Bid"
				}, {
					name : "Kaij"
				}, {
					name : "Dharur"
				}, {
					name : "Parli"
				}, {
					name : "Ambejogai"
				} ]
			},

			{
				name : "Bhandara",
				talukas : [ {
					name : "Bhandara"
				} ]
			},

			{
				name : "Buldhana",
				talukas : [ {
					name : "Jalgaon (Jamod)"
				}, {
					name : "Sangrampur"
				}, {
					name : "Shegaon"
				}, {
					name : "Nandura"
				}, {
					name : "Malkapur"
				}, {
					name : "Motala"
				}, {
					name : "Khamgaon"
				}, {
					name : "Mehkar"
				}, {
					name : "Chikhli"
				}, {
					name : "Buldana"
				}, {
					name : "Deolgaon Raja"
				}, {
					name : "Sindkhed Raja"
				}, {
					name : "Lonar"
				} ]
			},

			{
				name : "Chandrapur",
				talukas : [ {
					name : "Warora"
				}, {
					name : "Chimur"
				}, {
					name : "Nagbhir"
				}, {
					name : "Brahmapuri"
				}, {
					name : "Sawali"
				}, {
					name : "Sindewahi"
				}, {
					name : "Bhadravati"
				}, {
					name : "Chandrapur"
				}, {
					name : "Mul"
				}, {
					name : "Pombhurna"
				}, {
					name : "Ballarpur"
				}, {
					name : "Korpana"
				}, {
					name : "Jiwati"
				}, {
					name : "Rajura"
				}, {
					name : "Gondpipri"
				} ]
			},

			{
				name : "Dhule",
				talukas : [ {
					name : "Shirpur"
				}, {
					name : "Sindkhede"
				}, {
					name : "Sakri"
				}, {
					name : "Dhule"
				} ]
			},

			{
				name : "Gadchiroli",
				talukas : [ {
					name : "Desaiganj (Vadasa)"
				}, {
					name : "Armori"
				}, {
					name : "Kurkheda"
				}, {
					name : "Korchi"
				}, {
					name : "Dhanora"
				}, {
					name : "Gadchiroli"
				}, {
					name : "Chamorshi"
				}, {
					name : "Mulchera"
				}, {
					name : "Etapalli"
				}, {
					name : "Bhamragad"
				}, {
					name : "Aheri"
				}, {
					name : "Sironcha"
				} ]
			},

			{
				name : "Gondia",
				talukas : [ {
					name : "Tirora"
				}, {
					name : "Goregaon"
				}, {
					name : "Gondiya"
				}, {
					name : "Amgaon"
				}, {
					name : "Salekasa"
				}, {
					name : "Sadak-Arjuni"
				}, {
					name : "Arjuni Morgaon"
				}, {
					name : "Deori"
				} ]
			},

			{
				name : "Hingoli",
				talukas : [ {
					name : "Sengaon"
				}, {
					name : "Hingoli"
				}, {
					name : "Aundha (Nagnath)"
				}, {
					name : "Kalamnuri"
				}, {
					name : "Basmath"
				} ]
			},

			{
				name : "Jalgaon",
				talukas : [ {
					name : "Chopda"
				}, {
					name : "Yawal"
				}, {
					name : "Raver"
				}, {
					name : "Muktainagar"
				}, {
					name : "Bodvad"
				}, {
					name : "Bhusawal"
				}, {
					name : "Jalgaon"
				}, {
					name : "Erandol"
				}, {
					name : "Dharangaon"
				}, {
					name : "Amalner"
				}, {
					name : "Parola"
				}, {
					name : "Bhadgaon"
				}, {
					name : "Chalisgaon"
				}, {
					name : "Pachora"
				}, {
					name : "Jamner"
				} ]
			},

			{
				name : "Nagpur",
				talukas : [ {
					name : "Savner"
				}, {
					name : "Parseoni"
				}, {
					name : "Ramtek"
				}, {
					name : "Mauda"
				}, {
					name : "Kamptee"
				}, {
					name : "Nagpur (Rural)"
				}, {
					name : "Nagpur (Urban)"
				}, {
					name : "Hingna"
				}, {
					name : "Umred"
				}, {
					name : "Kuhi"
				}, {
					name : "Bhiwapur"
				}, {
					name : "Narkhed"
				}, {
					name : "Katol"
				}, {
					name : "Kalameshwar"
				} ]
			},

			{
				name : "Pune",
				talukas : [ {
					name : "Junnar"
				}, {
					name : "Ambegaon"
				}, {
					name : "Shirur"
				}, {
					name : "Khed"
				}, {
					name : "Mawal"
				}, {
					name : "Mulshi"
				}, {
					name : "Haveli"
				}, {
					name : "Pune City"
				}, {
					name : "Daund"
				}, {
					name : "Purandhar"
				}, {
					name : "Velhe"
				}, {
					name : "Bhor"
				}, {
					name : "Baramati"
				}, {
					name : "Indapur"
				} ]
			},

			{
				name : "Jalna",
				talukas : [ {
					name : "Ambad"
				}, {
					name : "Badnapur"
				}, {
					name : "Bhokardan"
				}, {
					name : "Ghansawangi"
				}, {
					name : "Jafferabad"
				}, {
					name : "Jalna"
				}, {
					name : "Mantha"
				}, {
					name : "Partur"
				} ]
			}, {
				name : "Kolhapur",
				talukas : [ {
					name : "Ajra"
				}, {
					name : "Bavda"
				}, {
					name : "Chandgad"
				}, {
					name : "Gadhinglaj"
				}, {
					name : "Hatkanangle"
				}, {
					name : "Kagal"
				}, {
					name : "Karvir"
				}, {
					name : "Panhala"
				}, {
					name : "Radhanagari"
				}, {
					name : "Shahuwadi"
				}, {
					name : "Shirol"
				} ]
			}, {
				name : "Latur",
				talukas : [ {
					name : "Ahmadpur"
				}, {
					name : "Ausa"
				}, {
					name : "Chakur"
				}, {
					name : "Latur"
				}, {
					name : "Nilanga"
				}, {
					name : "Renapur"
				}, {
					name : "Shirur-Anantpal"
				}, {
					name : "Udgir"
				} ]
			}, {
				name : "Mumbai City"
			}, {
				name : "Mumbai Suburban",
				talukas : [ {
					name : "Andheri"
				}, {
					name : "Borivali"
				}, {
					name : "Kurla"
				} ]
			},

			{
				name : "Nanded",
				talukas : [ {
					name : "Ardhapur"
				}, {
					name : "Bhokar"
				}, {
					name : "Biloli"
				}, {
					name : "Deglur"
				}, {
					name : "Dharmabad"
				}, {
					name : "Hadgaon"
				}, {
					name : "Himayatnagar"
				}, {
					name : "Kandhar"
				},

				{
					name : "Kinwat"
				}, {
					name : "Loha"
				}, {
					name : "Mahoor"
				}, {
					name : "Mudkhed"
				},

				{
					name : "Mukhed"
				}, {
					name : "Naigaon (Khairgaon)"
				}, {
					name : "Nanded"
				}, {
					name : "Umri"
				} ]
			},

			{
				name : "Nandurbar",
				talukas : [ {
					name : "Akkalkuwa"
				}, {
					name : "Akrani"
				}, {
					name : "Nandurbar"
				}, {
					name : "Nawapur"
				}, {
					name : "Shahade"
				}, {
					name : "Talode"
				} ]
			}, {
				name : "nashik",
				talukas : [ {
					name : "Baglan"
				}, {
					name : "Chandvad"
				}, {
					name : "Deola"
				}, {
					name : "Dindori"
				}, {
					name : "Igatpuri"
				}, {
					name : "Kalwan"
				}, {
					name : "Malegaon"
				}, {
					name : "Nandgaon"
				}, {
					name : "Nashik"
				}, {
					name : "Niphad"
				}, {
					name : "Peint"
				}, {
					name : "Sinnar"
				}, {
					name : "Surgana"
				}, , {
					name : "Trimbakeshwar"
				}, {
					name : "Yevla"
				} ]
			}, {
				name : "Osmanabad",
				talukas : [ {
					name : "Bhum"
				}, {
					name : "Kalamb"
				}, {
					name : "Lohara"
				}, {
					name : "Osmanabad"
				}, {
					name : "Paranda"
				}, {
					name : "Tuljapur"
				}, {
					name : "Umarga"
				}, {
					name : "Washi"
				} ]
			}, {
				name : "Parbhani",
				talukas : [ {
					name : "Gangakhed"
				}, {
					name : "Jintur"
				}, {
					name : "Manwath"
				}, {
					name : "Palam"
				}, {
					name : "Parbhani"
				}, {
					name : "Purna"
				}, {
					name : "Sailu"
				}, {
					name : "Sonpeth"
				} ]
			}, {
				name : "Raigad",
				talukas : [ {
					name : "Alibag"
				}, {
					name : "Karjat"
				}, {
					name : "Khalapur"
				}, {
					name : "Mahad"
				}, {
					name : "Mangaon"
				}, {
					name : "Mhasla"
				}, {
					name : "Murud"
				}, {
					name : "Panvel"
				}, {
					name : "Pen"
				}, {
					name : "Poladpur"
				}, {
					name : "Roha"
				}, {
					name : "Shrivardhan"
				}, {
					name : "Tala"
				}, {
					name : "Sudhagad"
				}, {
					name : "Uran"
				} ]
			}, {
				name : "Ratnagiri",
				talukas : [ {
					name : "Chiplun"
				}, {
					name : "Dapoli"
				}, {
					name : "Guhagar"
				}, {
					name : "Khed"
				}, {
					name : "Lanja"
				}, {
					name : "Mandangad"
				}, {
					name : "Rajapur"
				}, {
					name : "Ratnagiri"
				}, {
					name : "Sangameshwar"
				} ]
			}, {
				name : "Sangli",
				talukas : [ {
					name : "Atpadi"
				}, {
					name : "Jat"
				}, {
					name : "Kadegaon"
				}, {
					name : "Kavathemahankal"
				}, {
					name : "Khanapur"
				}, {
					name : "Miraj"
				}, {
					name : "Palus"
				}, {
					name : "Shirala"
				}, {
					name : "Tasgaon"
				}, {
					name : "Walwa"
				} ]
			}, {
				name : "Satara",
				talukas : [ {
					name : "Jaoli"
				}, {
					name : "Karad"
				}, {
					name : "Khandala"
				}, {
					name : "Khatav"
				}, {
					name : "Koregaon"
				}, {
					name : "Mahabaleshwar"
				}, {
					name : "Man"
				}, {
					name : "Patan"
				}, {
					name : "Phaltan"
				}, {
					name : "Satara"
				}, {
					name : "Wai"
				} ]
			}, {
				name : "Sindhudurg",
				talukas : [ {
					name : "Devgad"
				}, {
					name : "Dodamarg"
				}, {
					name : "Kankavli"
				}, {
					name : "Kudal"
				}, {
					name : "Malwan"
				}, {
					name : "Sawantwadi"
				}, {
					name : "Vaibhavvadi"
				}, {
					name : "Vengurla"
				} ]
			}, {
				name : "Solapur",
				talukas : [ {
					name : "Akkalkot"
				}, {
					name : "Barshi"
				}, {
					name : "Karmala"
				}, {
					name : "Madha"
				}, {
					name : "Malshiras"
				}, {
					name : "Mangalvedhe"
				}, {
					name : "Mohol"
				}, {
					name : "Pandharpur"
				}, {
					name : "Sangole"
				}, {
					name : "Solapur North"
				}, {
					name : "Solapur South"
				} ]
			}, {
				name : "Thane",
				talukas : [ {
					name : "Ambarnath"
				}, {
					name : "Bhiwandi"
				}, {
					name : "Kalyan"
				}, {
					name : "Murbad"
				}, {
					name : "Shahapur"
				},  {
					name : "Thane Taluka"
				}, {
					name : "Ulhasnagar"
				} ]
			},{
				name : "Palghar",
				talukas : [ {
					name : "Dahanu"
				}, {
					name : "Jawhar"
				}, {
					name : "Mokhada"
				}, {
					name : "Palghar"
				}, {
					name : "Talasari"
				}, {
					name : "Vada"
				}, {
					name : "Vasai-Virar"
				}, {
					name : "Vikramgad"
				} ]
			}, {
				name : "Wardha",
				talukas : [ {
					name : "Arvi"
				}, {
					name : "Ashti"
				}, {
					name : "Deoli"
				}, {
					name : "Hinganghat"
				}, {
					name : "Karanja"
				}, {
					name : "Samudrapur"
				}, {
					name : "Seloo"
				}, {
					name : "Wardha"
				} ]
			}, {
				name : "Washim",
				talukas : [ {
					name : "Karanja"
				}, {
					name : "Malegaon"
				}, {
					name : "Mangrulpir"
				}, {
					name : "Manora"
				}, {
					name : "Risod"
				}, {
					name : "Washim"
				} ]
			},

			{
				name : "Yavatmal",
				talukas : [ {
					name : "Arni"
				}, {
					name : "Babulgaon"
				}, {
					name : "Darwha"
				}, {
					name : "Digras"
				}, {
					name : "Ghatanji"
				}, {
					name : "Kalamb"
				}, {
					name : "Kelapur"
				}, {
					name : "Mahagaon"
				}, {
					name : "Maregaon"
				}, {
					name : "Ner"
				},

				{
					name : "Pusad"
				}, {
					name : "Ralegaon"
				}, {
					name : "Umarkhed"
				}, {
					name : "Wani"
				}, {
					name : "Yavatmal"
				}, {
					name : "Zari-Jamani"
				} ]
			} ]
		}, {
			name : "Gujarat",
			districts : [ {
				name : "Ahmedabad",
				talukas : [ {
					name : "Mandal"
				}, {
					name : "Detroj-Rampura"
				}, {
					name : "Viramgam"
				}, {
					name : "Sanand"
				}, {
					name : "Ahmadabad City"
				}, {
					name : "Daskroi"
				}, {
					name : "Dholka"
				}, {
					name : "Bavla"
				}, {
					name : "Ranpur"
				}, {
					name : "Barwala"
				}, {
					name : "Dhandhuka"
				} ]
			},

			{
				name : "Amreli",
				talukas : [ {
					name : "Kunkavav Vadia"
				}, {
					name : "Babra"
				}, {
					name : "Lathi"
				}, {
					name : "Lilia"
				}, {
					name : "Amreli"
				}, {
					name : "Bagasara"
				}, {
					name : "Dhari"
				}, {
					name : "Savar Kundla"
				}, {
					name : "Khambha"
				}, {
					name : "Jafrabad"
				}, {
					name : "Rajula"
				} ]
			},

			{
				name : "Anand",
				talukas : [ {
					name : "Tarapur"
				}, {
					name : "Sojitra"
				}, {
					name : "Umreth"
				}, {
					name : "Anand"
				}, {
					name : "Petlad"
				}, {
					name : "Khambhat"
				}, {
					name : "Borsad"
				}, {
					name : "Anklav"
				} ]
			},

			{
				name : "Aravalli",
				talukas : [ {
					name : "Aravalli"
				} ]
			},

			{
				name : "Banaskantha (Palanpur)",
				talukas : [ {
					name : "Danta"
				}, {
					name : "Vadgam"
				}, {
					name : "Palanpur"
				}, {
					name : "Deesa"
				}, {
					name : "Deodar"
				}, {
					name : "Bhabhar"
				}, {
					name : "Kankrej"
				}, {
					name : "Vav"
				}, {
					name : "Tharad"
				}, {
					name : "Dhanera"
				}, {
					name : "Dantiwada"
				}, {
					name : "Amirgadh"
				} ]
			},

			{
				name : "Bharuch",
				talukas : [ {
					name : "Jambusar"
				}, {
					name : "Amod"
				}, {
					name : "Vagra"
				}, {
					name : "Bharuch"
				}, {
					name : "Jhagadia"
				}, {
					name : "Anklesvar"
				}, {
					name : "Hansot"
				}, {
					name : "Valia"
				} ]
			},

			{
				name : "Bhavnagar",
				talukas : [ {
					name : "Botad"
				}, {
					name : "Vallabhipur"
				}, {
					name : "Gadhada"
				}, {
					name : "Umrala"
				}, {
					name : "Bhavnagar"
				}, {
					name : "Ghogha"
				}, {
					name : "Sihor"
				}, {
					name : "Gariadhar"
				}, {
					name : "Palitana"
				}, {
					name : "Talaja"
				}, {
					name : "Mahuva"
				} ]
			},

			{
				name : "Botad",
				talukas : [ {
					name : "Botad"
				} ]
			},

			{
				name : "Chhota Udepur",
				talukas : [ {
					name : "Chhota Udepur"
				} ]
			},

			{
				name : "Dahod",
				talukas : [ {
					name : "Fatepura"
				}, {
					name : "Jhalod"
				}, {
					name : "Limkheda"
				}, {
					name : "Dohad"
				}, {
					name : "Garbada"
				}, {
					name : "Devgadbaria"
				}, {
					name : "Dhanpur"
				} ]
			},

			{
				name : "Dangs (Ahwa)",
				talukas : [ {
					name : "The Dangs"
				} ]
			},

			{
				name : "Devbhoomi Dwarka"
			},

			{
				name : "Gandhinagar",
				talukas : [ {
					name : "Kalol"
				}, {
					name : "Mansa"
				}, {
					name : "Gandhinagar"
				}, {
					name : "Dehgam"
				} ]
			},

			{
				name : "Gir Somnath"
			},

			{
				name : "Jamnagar",
				talukas : [ {
					name : "Okhamandal"
				}, {
					name : "Khambhalia"
				}, {
					name : "Jamnagar"
				}, {
					name : "Jodiya"
				}, {
					name : "Dhrol"
				}, {
					name : "Kalavad"
				}, {
					name : "Lalpur"
				}, {
					name : "Kalyanpur"
				}, {
					name : "Bhanvad"
				}, {
					name : "Jamjodhpur"
				} ]
			},

			{
				name : "Junagadh",
				talukas : [ {
					name : "Manavadar"
				}, {
					name : "Vanthali"
				}, {
					name : "Junagadh"
				}, {
					name : "Bhesan"
				}, {
					name : "Visavadar"
				}, {
					name : "Mendarda"
				}, {
					name : "Keshod"
				}, {
					name : "Mangrol"
				}, {
					name : "Malia"
				}, {
					name : "Talala"
				}, {
					name : "Patan-Veraval"
				}, {
					name : "Sutrapada"
				}, {
					name : "Kodinar"
				}, {
					name : "Una"
				} ]
			},

			{
				name : "Kachchh"
			}, {
				name : "Kheda (Nadiad)"
			}, {
				name : "Mahisagar"
			}, {
				name : "Mehsana"
			}, {
				name : "Morbi"
			}, {
				name : "Narmada (Rajpipla)"
			}, {
				name : "Navsari"
			}, {
				name : "Panchmahal (Godhra)"
			}, {
				name : "Patan"
			}, {
				name : "Porbandar"
			}, {
				name : "Rajkot"
			}, {
				name : "Sabarkantha (Himmatnagar)"
			}, {
				name : "Surat"
			}, {
				name : "Surendranagar"
			}, {
				name : "Tapi (Vyara)"
			}, {
				name : "Vadodara"
			}, {
				name : "Valsad"
			} ]
		}, {
			name : "Karnataka",
			districts : [ {
				name : "Bagalkot"
			}, {
				name : "Bangalore Rural"
			}, {
				name : "Bangalore Urban"
			}, {
				name : "Belgaum"
			}, {
				name : "Bellary"
			}, {
				name : "Bidar"
			}, {
				name : "Bijapur"
			}, {
				name : "Chamarajanagar"
			}, {
				name : "Chickmagalur"
			}, {
				name : "Chikballapur"
			}, {
				name : "Chitradurga"
			}, {
				name : "Dakshina Kannada"
			}, {
				name : "Davangere"
			}, {
				name : "Dharwad"
			}, {
				name : "Gadag"
			}, {
				name : "Gulbarga"
			}, {
				name : "Hassan"
			}, {
				name : "Haveri"
			}, {
				name : "Kodagu"
			}, {
				name : "Kolar"
			}, {
				name : "Koppal"
			}, {
				name : "Mandya"
			}, {
				name : "Mysore"
			}, {
				name : "Raichur"
			}, {
				name : "Ramnagara"
			}, {
				name : "Shimoga"
			}, {
				name : "Tumkur"
			}, {
				name : "Udupi"
			}, {
				name : "Uttara Kannada (Karwar)"
			}, {
				name : "Yadgir"
			} ]
		}, {
			name : "Kerala",
			districts : [ {
				name : "Alappuzha"
			}, {
				name : "Ernakulam"
			}, {
				name : "Idukki"
			}, {
				name : "Kannur"
			}, {
				name : "Kasaragod"
			}, {
				name : "Kollam"
			}, {
				name : "Kottayam"
			}, {
				name : "Kozhikode"
			}, {
				name : "Malappuram"
			}, {
				name : "Palakkad"
			}, {
				name : "Pathanamthitta"
			}, {
				name : "Thiruvananthapuram"
			}, {
				name : "Thrissur"
			}, {
				name : "Wayanad"
			} ]
		}, {
			name : "Madhya Pradesh",
			districts : [ {
				name : "Alirajpur"
			}, {
				name : "Anuppur"
			}, {
				name : "Ashoknagar"
			}, {
				name : "Balaghat"
			}, {
				name : "Barwani"
			}, {
				name : "Betul"
			}, {
				name : "Bhind"
			}, {
				name : "Bhopal"
			}, {
				name : "Burhanpur"
			}, {
				name : "Chhatarpur"
			}, {
				name : "Chhindwara"
			}, {
				name : "Damoh"
			}, {
				name : "Datia"
			}, {
				name : "Dewas"
			}, {
				name : "Dhar"
			}, {
				name : "Dindori"
			}, {
				name : "Guna"
			}, {
				name : "Gwalior"
			}, {
				name : "Harda"
			}, {
				name : "Hoshangabad"
			}, {
				name : "Indore"
			}, {
				name : "Jabalpur"
			}, {
				name : "Jhabua"
			}, {
				name : "Katni"
			}, {
				name : "Khandwa"
			}, {
				name : "Khargone"
			}, {
				name : "Mandla"
			}, {
				name : "Mandsaur"
			}, {
				name : "Morena"
			}, {
				name : "Narsinghpur"
			}, {
				name : "Neemuch"
			}, {
				name : "Panna"
			}, {
				name : "Raisen"
			}, {
				name : "Rajgarh"
			}, {
				name : "Ratlam"
			}, {
				name : "Rewa"
			}, {
				name : "Sagar"
			}, {
				name : "Satna"
			}, {
				name : "Sehore"
			}, {
				name : "Seoni"
			}, {
				name : "Shahdol"
			}, {
				name : "Shajapur"
			}, {
				name : "Sheopur"
			}, {
				name : "Shivpuri"
			}, {
				name : "Sidhi"
			}, {
				name : "Singrauli"
			}, {
				name : "Tikamgarh"
			}, {
				name : "Ujjain"
			}, {
				name : "Umaria"
			}, {
				name : "Vidisha"
			} ]
		}, {
			name : "Andaman and Nicobar Island",
			districts : [ {
				name : "Nicobar"
			}, {
				name : "North and Middle Andaman"
			}, {
				name : "South Andaman"
			} ]
		}, {
			name : "Andhra Pradesh",
			districts : [ {
				name : "Anantapur"
			}, {
				name : "Chittoor"
			}, {
				name : "Cuddapah"
			}, {
				name : "East Godavari"
			}, {
				name : "Guntur"
			}, {
				name : "Krishna"
			}, {
				name : "Kurnool"
			}, {
				name : "Nellore"
			}, {
				name : "Prakasam"
			}, {
				name : "Srikakulam"
			}, {
				name : "Visakhapatnam"
			}, {
				name : "Vizianagaram"
			}, {
				name : "West Godavari"
			} ]
		}, {
			name : "Chandigarh",
			districts : [ {
				name : "Chandigarh"
			} ]
		}, {
			name : "Dadra and Nagar Haveli",
			districts : [ {
				name : "Dadra and Nagar Haveli"
			} ]
		}, {
			name : "Daman and Diu",
			districts : [ {
				name : "Daman"
			}, {
				name : "Diu"
			} ]
		}, {
			name : "Delhi",
			districts : [ {
				name : "Central Delhi"
			}, {
				name : "East Delhi"
			}, {
				name : "New Delhi"
			}, {
				name : "North Delhi"
			}, {
				name : "North East Delhi"
			}, {
				name : "North West Delhi"
			}, {
				name : "South Delhi"
			}, {
				name : "South West Delhi"
			} ]
		}, {
			name : "Goa",
			districts : [ {
				name : "North Goa"
			}, {
				name : "South Goa"
			} ]
		}, {
			name : "Arunachal Pradesh"
		}, {
			name : "Assam"
		}, {
			name : "Bihar"
		}, {
			name : "Chhattisgarh"
		},

		{
			name : "Haryana"
		}, {
			name : "Himachal Pradesh"
		}, {
			name : "Jammu and Kashmir"
		}, {
			name : "Jharkhand"
		}, {
			name : "Manipur"
		}, {
			name : "Meghalaya"
		}, {
			name : "Mizoram"
		}, {
			name : "Nagaland"
		}, {
			name : "Orissa"
		}, {
			name : "Punjab"
		}, {
			name : "Pondicherry"
		}, {
			name : "Rajasthan"
		}, {
			name : "Sikkim"
		}, {
			name : "Tamil Nadu"
		}, {
			name : "Tripura"
		}, {
			name : "Uttar Pradesh"
		}, {
			name : "Uttarakhand"
		}, {
			name : "West Bengal"
		}, {
			name : "Other"
		} ]
	});
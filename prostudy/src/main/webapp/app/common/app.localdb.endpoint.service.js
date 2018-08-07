angular.module("prostudyApp").factory('localDBServiceFactory',
		localDBServiceFactory);

function localDBServiceFactory($log, $q, $timeout, $localStorage) {

	var serviceFactory = {};
	var ChapterService = {};
	serviceFactory.getChapterService = function() {
		return ChapterService;
	}

	ChapterService.addChapter = function(chapter) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addChapter...");
			var chapterList = angular.fromJson($localStorage.dbAddChapter);
			if (typeof chapterList === 'undefined')
				chapterList = [];
			chapter.id = chapterList.length + 1;
			chapterList.push(chapter);
			$localStorage.dbAddChapter = angular.toJson(chapterList);
			deferred.resolve({
				"msg" : "Chapter Added Successfully."
			});
			$log.debug("$localStorage.dbAddChapter: "
					+ $localStorage.dbAddChapter);
			deferred.resolve({
				"msg" : "Chapter Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	ChapterService.getChapters = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getChapters...");
			var chapterList = angular.fromJson($localStorage.dbAddChapter);
			$log.debug("getChapters :- $localStorage.dbAddChapter "
					+ $localStorage.dbAddChapter);
			if (typeof chapterList === 'undefined')
				chapterList = [];
			deferred.resolve(chapterList);
		}, 1000);

		return deferred.promise;
	}

	ChapterService.getChaptersByID = function(selectedChapterId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempBookItem = [];
			var chapterList = angular.fromJson($localStorage.dbAddChapter);
			if (typeof chapterList === 'undefined')
				chapterList = [];
			// $log.debug(" ---- ByID==" + selectedChapterId);
			for (i = 0; i < chapterList.length; i++) {
				if (selectedChapterId == chapterList[i].id) {
					tempBookItem.push(chapterList[i]);
					$log.debug("TEMP=getChaptersByID==" + tempBookItem);
				}
			}
			deferred.resolve(tempBookItem);

		}, 1000);
		return deferred.promise;
	}// end of getChapterById

	var BookService = {};

	serviceFactory.getBookService = function() {
		return BookService;
	}

	BookService.addBook = function(book) {

		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB addBook...");
			var bookList = angular.fromJson($localStorage.dbAddBook);
			if (typeof bookList === 'undefined')
				bookList = [];
			book.bookid = bookList.length + 1;
			bookList.push(book);
			$localStorage.dbAddBook = angular.toJson(bookList);
			$log
					.debug("$localStorage.dbAddChapter: "
							+ $localStorage.dbAddBook);
			deferred.resolve({
				"msg" : "Book Added Successfully in Local Storage-dbAddBook."
			});
		}, 1000);

		return deferred.promise;
	}

	BookService.getBooks = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getBooks...");
			var bookList = angular.fromJson($localStorage.dbAddBook);
			if (typeof bookList === 'undefined')
				bookList = [];
			deferred.resolve(bookList);
		}, 1000);

		return deferred.promise;
	}

	BookService.getBooksByID = function(selectedBookId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempBookItem = [];

			var bookList = angular.fromJson($localStorage.dbAddBook);

			if (typeof bookList === 'undefined')
				bookList = [];

			for (i = 0; i < bookList.length; i++) {
				if (selectedBookId == bookList[i].bookid) {
					$log.debug("TEMP==" + bookList[i].bookid);
					tempBookItem.push(bookList[i].chapters[0]);
					$log.debug("TEMP=getBooksByID==" + tempBookItem);
				}
			}

			deferred.resolve(tempBookItem);

		}, 1000);
		return deferred.promise;
	}// end of getBooksByID

	BookService.bookLikeCount = function(selectedBookId) {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB bookLikeCount...");
			var bookList = angular.fromJson($localStorage.dbAddBook);
			if (typeof bookList === 'undefined')
				bookList = [];

			for (var i = 0; i < bookList.length; i++) {
				if (selectedBookId == bookList[i].bookid) {

					bookList[i].likes = bookList[i].likes + 1;

					$log.debug("likeCount..." + bookList[i].likes);

				}
			}

			bookList.push();
			$localStorage.dbAddBook = angular.toJson(bookList);

			deferred.resolve({
				"msg" : "count Added Successfully."
			});

		}, 1000);

		return deferred.promise;

	}

	BookService.bookDislikeCount = function(selectedBookId) {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB likeCount...");
			var bookList = angular.fromJson($localStorage.dbAddBook);
			if (typeof bookList === 'undefined')
				bookList = [];

			for (var i = 0; i < bookList.length; i++) {
				if (selectedBookId == bookList[i].bookid) {

					bookList[i].dislikes = bookList[i].dislikes + 1;

					$log.debug("dislikesCount..." + bookList[i].dislikes);

				}
			}

			bookList.push();
			$localStorage.dbAddBook = angular.toJson(bookList);

			deferred.resolve({
				"msg" : "count Added Successfully."
			});

		}, 1000);

		return deferred.promise;

	}

	BookService.addComment = function(bookid, comment) {

		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB addBook...");
			var bookList = angular.fromJson($localStorage.dbAddBook);
			if (typeof bookList === 'undefined')
				bookList = [];
			for (i = 0; i < bookList.length; i++) {
				if (bookid == bookList[i].bookid) {
					bookList[i].comments.push(comment);
				}
			}

			$localStorage.dbAddBook = angular.toJson(bookList);

			$log
					.debug("$localStorage.dbAddChapter: "
							+ $localStorage.dbAddBook);

			$log
					.debug("$localStorage.dbAddChapter: "
							+ $localStorage.dbAddBook);

			deferred.resolve({
				"msg" : "Book Comment Added Successfully ."
			});
		}, 1000);

		return deferred.promise;
	}

	var StudentService = {};

	serviceFactory.getStudentService = function() {
		return StudentService;
	}

	StudentService.addStudent = function(stud) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStudent...");
			var studList = angular.fromJson($localStorage.dbStudents);
			if (typeof studList === 'undefined')
				studList = [];
			stud.ID = studList.length + 1;
			stud.attendance = "Present";
			studList.push(stud);
			$localStorage.dbStudents = angular.toJson(studList);
			deferred.resolve({
				"msg" : "Student Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	StudentService.getStudents = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getStudents...");
			var studList = angular.fromJson($localStorage.dbStudents);
			if (typeof studList === 'undefined')
				studList = [];
			deferred.resolve(studList);
		}, 1000);

		return deferred.promise;

	}
	StudentService.addAttendance = function(selectedStudID) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addAttendance...");
			var studList = angular.fromJson($localStorage.dbStudents);
			if (typeof studList === 'undefined')
				studList = [];

			for (var i = 0; i < studList.length; i++) {
				if (selectedStudID == studList[i].ID) {
					studList[i].attendance = "Absent";
				}
			}

			$localStorage.dbStudents = angular.toJson(studList);
			deferred.resolve({
				"msg" : "Attendance Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	var PracticeExamService = {};

	serviceFactory.getPracticeExamService = function() {
		return PracticeExamService;
	}

	PracticeExamService.addPracticeExam = function(test) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addPracticeExam...");
			var practiceExamList = angular
					.fromJson($localStorage.dbPracticeExams);
			if (typeof practiceExamList === 'undefined')
				practiceExamList = [];
			test.examId = practiceExamList.length + 1;
			practiceExamList.push(test);
			$localStorage.dbPracticeExams = angular.toJson(practiceExamList);
			deferred.resolve({
				"msg" : "PracticeExams Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	PracticeExamService.getPracticeExams = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getPracticeExams...");
			var practiceExamList = angular
					.fromJson($localStorage.dbPracticeExams);
			if (typeof practiceExamList === 'undefined')
				practiceExamList = [];
			deferred.resolve(practiceExamList);
		}, 1000);

		return deferred.promise;

	}

	PracticeExamService.getPracticeExamById = function(selectedExamId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];

			var TestList = angular.fromJson($localStorage.dbPracticeExams);

			if (typeof TestList === 'undefined')
				TestList = [];

			for (i = 0; i < TestList.length; i++) {
				if (selectedExamId == TestList[i].examId) {

					tempItem.push(TestList[i]);

				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}

	PracticeExamService.addPracticeExamResult = function(data) {

		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB addExamResult...");
			var practiceExamResultList = angular
					.fromJson($localStorage.dbPracticeExamResult);
			if (typeof practiceExamResultList === 'undefined')
				practiceExamResultList = [];

			data.ID = practiceExamResultList.length + 1;
			practiceExamResultList.push(data);
			$localStorage.dbPracticeExamResult = angular
					.toJson(practiceExamResultList);

			deferred.resolve({
				"msg" : "ExamResult Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	PracticeExamService.getPracticeExamResult = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getExamResult...");
			var practiceExamResultList = angular
					.fromJson($localStorage.dbPracticeExamResult);
			if (typeof practiceExamResultList === 'undefined')
				practiceExamResultList = [];
			deferred.resolve(practiceExamResultList);
		}, 1000);
		return deferred.promise;

	}

	PracticeExamService.getPracticeExamResultbyID = function(currentUserID) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];

			var practiceExamResultList = angular
					.fromJson($localStorage.dbPracticeExamResult);

			if (typeof practiceExamResultList === 'undefined')
				practiceExamResultList = [];

			for (i = 0; i < practiceExamResultList.length; i++) {
				if (currentUserID == practiceExamResultList[i].userId) {
					tempItem.push(practiceExamResultList[i]);
				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}
	PracticeExamService.updatePracticeExam = function(editTest, selected) {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side updated local DB ...");
			var TestList = angular.fromJson($localStorage.dbPracticeExams);
			if (typeof TestList === 'undefined')
				TestList = [];

			for (var i = 0; i < TestList.length; i++) {
				if (editTest.examId == TestList[i].examId)
					TestList[i] = editTest;
			}
			if (selected.length > 0) {
				TestList[0].questions = [];
				for (var i = 0; i < 1; i++) {
					var k = 0;
					for (var j = 0; j < selected.length; j++) {
						TestList[i].questions[k] = selected[j];
						k++;
					}
				}
			} else {
				while (TestList[0].questions.length > 0) {
					TestList[0].questions.pop();
				}
			}

			$localStorage.dbPracticeExams = angular.toJson(TestList);
			deferred.resolve({
				"msg" : "TestList Updated Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	PracticeExamService.likeCount = function(selectedExamId) {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB likeCount...");
			var practiceExamList = angular
					.fromJson($localStorage.dbPracticeExams);
			if (typeof practiceExamList === 'undefined')
				practiceExamList = [];

			for (var i = 0; i < practiceExamList.length; i++) {
				if (selectedExamId == practiceExamList[i].examId) {

					practiceExamList[i].likes = practiceExamList[i].likes + 1;

					$log.debug("likeCount..." + practiceExamList[i].likes);

				}
			}

			practiceExamList.push();
			$localStorage.dbPracticeExams = angular.toJson(practiceExamList);

			deferred.resolve({
				"msg" : "count Added Successfully."
			});

		}, 1000);

		return deferred.promise;

	}

	PracticeExamService.dislikeCount = function(selectedExamId) {
		var deferred = $q.defer();
		$timeout(
				function() {
					$log.debug("In side local DB likeCount...");
					var practiceExamList = angular
							.fromJson($localStorage.dbPracticeExams);
					if (typeof practiceExamList === 'undefined')
						practiceExamList = [];

					for (var i = 0; i < practiceExamList.length; i++) {
						if (selectedExamId == practiceExamList[i].examId) {

							practiceExamList[i].dislikes = practiceExamList[i].dislikes + 1;

							$log.debug("dislikesCount..."
									+ practiceExamList[i].dislikes);

						}
					}

					practiceExamList.push();
					$localStorage.dbPracticeExams = angular
							.toJson(practiceExamList);

					deferred.resolve({
						"msg" : "count Added Successfully."
					});

				}, 1000);

		return deferred.promise;

	}

	var SyllabusService = {};

	serviceFactory.getSyllabusService = function() {
		return SyllabusService;
	}
	SyllabusService.addSyllabus = function(syll) {

		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB addSyllabus...");
			var syllabusList = angular.fromJson($localStorage.dbSyllabus);
			if (typeof syllabusList === 'undefined')
				syllabusList = [];

			syll.syllabusId = syllabusList.length + 1;
			syllabusList.push(syll);
			$localStorage.dbSyllabus = angular.toJson(syllabusList);
			deferred.resolve({
				"msg" : "Syllabus Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	SyllabusService.updateSyllabus = function(editRecord) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side updated local DB updateSyllabus...");
			var syllabusList = angular.fromJson($localStorage.dbSyllabus);
			if (typeof syllabusList === 'undefined')
				syllabusList = [];

			for (var i = 0; i < syllabusList.length; i++) {
				if (editRecord.syllabusId == syllabusList[i].syllabusId)
					syllabusList[i] = editRecord;
			}

			$localStorage.dbSyllabus = angular.toJson(syllabusList);
			deferred.resolve({
				"msg" : "Syllabus Updated Successfully."
			});

		}, 1000);

		return deferred.promise;
	}
	SyllabusService.getSyllabus = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getSyllabus...");
			var syllabusList = angular.fromJson($localStorage.dbSyllabus);
			if (typeof syllabusList === 'undefined')
				syllabusList = [];
			deferred.resolve(syllabusList);
		}, 1000);

		return deferred.promise;
	}

	var InstituteService = {};
	serviceFactory.getInstituteService = function() {
		return InstituteService;
	}

	InstituteService.addInstitute = function(insti, admins, teachers, students) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addInstitutes...");
			var instituteList = angular.fromJson($localStorage.dbInstitutes);
			if (typeof instituteList === 'undefined')
				instituteList = [];
			insti.id = instituteList.length + 1;
			insti.students = students;
			insti.admins = admins;
			insti.teachers = teachers;
			instituteList.push(insti);
			$localStorage.dbInstitutes = angular.toJson(instituteList);
			deferred.resolve({
				"msg" : "Institute Added Successfully.",
				instId : insti.id
			});
		}, 1000);

		return deferred.promise;
	}

	InstituteService.addInstituteAdmins = function(id, admins) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addInstitutes...");
			var instituteList = angular.fromJson($localStorage.dbInstitutes);
			if (typeof instituteList === 'undefined')
				instituteList = [];
			if (instituteList.length == id) {
				instituteList[id - 1].admins = admins;

			} else {
				for (var i = 0; i < instituteList.length; i++) {
					if (instituteList[i].id == id)
						for (var j = 0; j < admins.length; j++) {
							instituteList[i].admins.push(admins[j]);
						}
				}
			}

			$localStorage.dbInstitutes = angular.toJson(instituteList);
			deferred.resolve({
				"msg" : "Institute Admin added Successfully."
			});

		}, 1000);
		return deferred.promise;
	}

	InstituteService.addInstituteTeachers = function(id, teachers) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addInstitutes...");
			var instituteList = angular.fromJson($localStorage.dbInstitutes);
			if (typeof instituteList === 'undefined')
				instituteList = [];

			if (instituteList.length == id) {
				instituteList[id - 1].teachers = teachers;
			}

			else {
				for (var i = 0; i < instituteList.length; i++) {
					if (instituteList[i].id == id)
						for (var j = 0; j < teachers.length; j++) {
							instituteList[i].teachers.push(teachers[j]);
						}
				}
			}
			$localStorage.dbInstitutes = angular.toJson(instituteList);
			deferred.resolve({
				"msg" : "Institute Teachers added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}
	InstituteService.addInstituteStudents = function(id, students) {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB addInstitutes...");
			var instituteList = angular.fromJson($localStorage.dbInstitutes);
			if (typeof instituteList === 'undefined')
				instituteList = [];

			if (instituteList.length == id) {
				instituteList[id - 1].students = students;
			} else {
				for (var i = 0; i < instituteList.length; i++) {
					if (instituteList[i].id == id)
						for (var j = 0; j < students.length; j++) {
							instituteList[i].students.push(students[j]);
						}
				}
			}
			$localStorage.dbInstitutes = angular.toJson(instituteList);
			deferred.resolve({
				"msg" : "Institute Students added Successfully."
			});

		}, 1000);
		return deferred.promise;
	}

	InstituteService.getInstitutes = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getStudents...");
			var instituteList = angular.fromJson($localStorage.dbInstitutes);
			if (typeof instituteList === 'undefined')
				instituteList = [];
			deferred.resolve(instituteList);
		}, 1000);

		return deferred.promise;

	}
	InstituteService.getInstituteById = function(selectedInstituteId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];

			var InstituteList = angular.fromJson($localStorage.dbInstitutes);

			if (typeof InstituteList === 'undefined')
				InstituteList = [];

			for (i = 0; i < InstituteList.length; i++) {
				if (selectedInstituteId == InstituteList[i].id) {
					tempItem.push(InstituteList[i]);
				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}
	InstituteService.editInstitute = function(editInstitute) {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side updated local DB ...");
			var InstList = angular.fromJson($localStorage.dbInstitutes);
			if (typeof InstList === 'undefined')
				InstList = [];

			for (var i = 0; i < InstList.length; i++) {
				if (editInstitute.id == InstList[i].id)
					InstList[i] = editInstitute;
			}

			$localStorage.dbInstitutes = angular.toJson(InstList);
			deferred.resolve({
				"msg" : "Institute Updated Successfully."
			});

		}, 1000);
		return deferred.promise;
	}

	var QuestionService = {};

	serviceFactory.getQuestionService = function() {
		return QuestionService;
	}

	QuestionService.addQuestion = function(ques) {

		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB addQuestion...");
			var questionList = angular.fromJson($localStorage.dbQuestion);
			if (typeof questionList === 'undefined')
				questionList = [];
			ques.quesId = questionList.length + 1;
			questionList.push(ques);
			$localStorage.dbQuestion = angular.toJson(questionList);
			deferred.resolve({
				"msg" : "Question Added Successfully."
			});

		}, 1000);
		return deferred.promise;
	}

	QuestionService.updateQuestion = function(ques) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStudent...");
			var questionList = angular.fromJson($localStorage.dbQuestion);
			if (typeof questionList === 'undefined')
				questionList = [];

			var result = questionList.filter(function(obj) {
				return obj.quesId == ques.quesId;
			});

			var index = questionList.indexOf(result[0]);
			if (index !== -1) {
				questionList[index] = ques;
			}
			$localStorage.dbQuestion = angular.toJson(questionList);
			deferred.resolve({
				"msg" : "Question Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	QuestionService.getQuestion = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getQuestion...");
			var questionList = angular.fromJson($localStorage.dbQuestion);
			if (typeof questionList === 'undefined')
				questionList = [];
			deferred.resolve(questionList);
		}, 1000);

		return deferred.promise;

	}

	serviceFactory.getSyllabusService = function() {
		return SyllabusService;
	}

	SyllabusService.addSyllabus = function(syll) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addSyllabus...");
			var syllabusList = angular.fromJson($localStorage.dbSyllabus);
			if (typeof syllabusList === 'undefined')
				syllabusList = [];

			syll.syllabusId = syllabusList.length + 1;
			syllabusList.push(syll);
			$localStorage.dbSyllabus = angular.toJson(syllabusList);
			deferred.resolve({
				"msg" : "Syllabus Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	SyllabusService.getSyllabus = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getSyllabus...");
			var syllabusList = angular.fromJson($localStorage.dbSyllabus);
			if (typeof syllabusList === 'undefined')
				syllabusList = [];
			deferred.resolve(syllabusList);
		}, 1000);

		return deferred.promise;

	}

	var localUserService = {};

	serviceFactory.getLocalUserService = function() {
		
		//var user = $localStorage.loggedinUser;
		
		return localUserService;
	}
	
	localUserService.saveLoggedInUser = function(loggedInUser) {
		$localStorage.loggedinUser = loggedInUser;

	}

	localUserService.logout = function() {
		$localStorage.loggedinUser = null;
	}
	
	localUserService.getLoggedinUser = function() {
		var user = $localStorage.loggedinUser;
		if (user == 'undefined' || user == null)
			return null;
		else
			return $localStorage.loggedinUser;
	}

	localUserService.getUserById = function(userId) {
		var foundUser;
		var userList = angular.fromJson($localStorage.dbUser);
		for (i = 0; i < userList.length; i++) {
			if (userId == userList[i].userId) {
				foundUser = userList[i];
				break;
			}

		}

		return foundUser;
	}
	
	
	
	var UserService = {};

	serviceFactory.getUserService = function() {
		return UserService;
	}

	UserService.addUser = function(user) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addLogin...");
			var userList = angular.fromJson($localStorage.dbUser);
			if (typeof userList === 'undefined')
				userList = [];
			user.userId = userList.length + 1;
			userList.push(user);
			$localStorage.dbUser = angular.toJson(userList);
			deferred.resolve({
				"msg" : "User added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	UserService.addOrUpdateRoleSec = function(roleSec) {
		var deferred = $q.defer();
		$timeout(function() {
			
			var roleSecList = angular.fromJson($localStorage.dbRoleSec);
			if (typeof roleSecList === 'undefined')
				roleSecList = [];
			
			roleSec.roleSecId = roleSecList.length + 1;
			roleSecList.push(roleSec);
			$localStorage.dbRoleSec = angular.toJson(roleSecList);
			deferred.resolve({
				"msg" : "RoleSec added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}
	
	UserService.getRoleSecList = function() {
		var deferred = $q.defer();
		$timeout(function() {
			
			var roleSecList = angular.fromJson($localStorage.dbRoleSec);
			if (typeof roleSecList === 'undefined')
				roleSecList = [];
			deferred.resolve(roleSecList);
		}, 1000);

		return deferred.promise;

	}
	
	UserService.updateRoleSecList = function(roleSec) {
		var deferred = $q.defer();
		$timeout(function() {

			var roleSecList = angular.fromJson($localStorage.dbRoleSec);
			if (typeof roleSecList === 'undefined')
				roleSecList = [];
			for (var i = 0; i < roleSecList.length; i++) {
				if (roleSec.roleSecId == roleSecList[i].roleSecId)
					roleSecList[i] = roleSec;
			}
			$localStorage.dbRoleSec = angular.toJson(roleSecList);
			deferred.resolve({
				"msg" : "Updated Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	UserService.getUsers = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getLogin...");
			var userList = angular.fromJson($localStorage.dbUser);
			if (typeof userList === 'undefined')
				userList = [];
			deferred.resolve(userList);
		}, 1000);

		return deferred.promise;

	}

	UserService.login = function(userName, pwd) {
		var deferred = $q.defer();
		$timeout(function() {
			var loggedin = false;
			var userList = angular.fromJson($localStorage.dbUser);
			if (typeof userList === 'undefined')
				userList = [];

			for (i = 0; i < userList.length; i++) {
				if (userList[i].userName === userName
						&& userList[i].pwd === pwd) {
					$localStorage.loggedinUser = userList[i];
					deferred.resolve(true);
				}
			}
			deferred.resolve(false);
		}, 1000);

		return deferred.promise;

	}

	UserService.saveLoggedInUser = function(user) {
		$localStorage.loggedinUser = user;

	}

	UserService.logout = function() {
		$localStorage.loggedinUser = null;
	}

	UserService.getLoggedinUser = function() {
		var user = $localStorage.loggedinUser;
		if (user == 'undefined' || user == null)
			return null;
		else
			return $localStorage.loggedinUser;
	}

	UserService.getUserById = function(userId) {
		var foundUser;
		var userList = angular.fromJson($localStorage.dbUser);
		for (i = 0; i < userList.length; i++) {
			if (userId == userList[i].userId) {
				foundUser = userList[i];
				break;
			}

		}

		return foundUser;
	}

	UserService.updateProfile = function(editProfile) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side updated local DB ...");
			var userList = angular.fromJson($localStorage.dbUser);
			if (typeof userList === 'undefined')
				userList = [];
			for (var i = 0; i < userList.length; i++) {
				if (editProfile.userId == userList[i].userId)
					userList[i] = editProfile;
			}
			$localStorage.dbUser = angular.toJson(userList);
			deferred.resolve({
				"msg" : "User data Updated Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	UserService.addMyBook = function(selectedBook) {

		var deferred = $q.defer();
		$timeout(function() {
			var currUserObj = UserService
					.getUserById($localStorage.loggedinUser.userId);
			var currUserObj = UserService
					.getUserById($localStorage.loggedinUser.userId);
			$log.debug("selectedBook------" + angular.toJson(selectedBook));
			currUserObj.book.push(selectedBook);

			UserService.updateProfile(currUserObj);

			$log.debug("selectedBook :" + selectedBook);

			$log.debug("currUserObj------" + angular.toJson(currUserObj));

			deferred.resolve({
				"msg" : "MyBook added Successfully."
			});

		}, 1000);
		return deferred.promise;
	}

	UserService.getMyBooks = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getMyBook...");
			var myBookList = angular.fromJson($localStorage.dbUser);
			if (typeof myBookList === 'undefined')
				myBookList = [];
			deferred.resolve(myBookList);
		}, 1000);

		return deferred.promise;
	}

	UserService.getBookId = function(bookID) {
		var foundBook;
		var myBookList = angular.fromJson($localStorage.dbAddBook);
		if (typeof myBookList === 'undefined')
			myBookList = [];

		for (i = 0; i < myBookList.length; i++) {
			if (bookID == myBookList[i].bookid) {
				foundBook = myBookList[i];
				break;
			}
		}

		return foundBook;
	}

	UserService.getBookbyID = function(selectedBookId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempBookItem = [];

			var bookList = angular.fromJson($localStorage.dbAddBook);

			if (typeof bookList === 'undefined')
				bookList = [];

			for (i = 0; i < bookList.length; i++) {
				if (selectedBookId == bookList[i].bookid) {
					tempBookItem.push(bookList[i]);
				}
			}

			deferred.resolve(tempBookItem);
		}, 1000);
		return deferred.promise;
	}

	UserService.getMyBookList = function() {

		var deferred = $q.defer();
		$timeout(function() {
			var currUserObj = UserService
					.getUserById($localStorage.loggedinUser.userId);
			deferred.resolve(currUserObj.book);
		}, 1000);

		return deferred.promise;
	}

	UserService.addMyPracticeExam = function(selectedExam) {

		var deferred = $q.defer();
		$timeout(function() {

			var currUserObj = UserService
					.getUserById($localStorage.loggedinUser.userId);
			currUserObj.exam.push(selectedExam);
			UserService.updateProfile(currUserObj);

			deferred.resolve({
				"msg" : "MyBook added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	UserService.getMyPracticeExams = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getMyPracticeExams...");
			var myPracticeExamList = angular
					.fromJson($localStorage.dbMyPracticeExam);
			if (typeof myPracticeExamList === 'undefined')
				myPracticeExamList = [];
			deferred.resolve(myPracticeExamList);
		}, 1000);

		return deferred.promise;

	}

	UserService.getExamId = function(examID) {
		var foundExam;
		var myExamList = angular.fromJson($localStorage.dbPracticeExams);
		if (typeof myExamList === 'undefined')
			myExamList = [];

		for (i = 0; i < myExamList.length; i++) {
			if (examID == myExamList[i].examId) {
				foundExam = myExamList[i];
				break;
			}
		}

		return foundExam;
	}

	UserService.getExambyID = function(selectedExamId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempExamItem = [];

			var examList = angular.fromJson($localStorage.dbPracticeExams);

			if (typeof examList === 'undefined')
				examList = [];

			for (i = 0; i < examList.length; i++) {
				if (selectedExamId == examList[i].examId) {
					tempExamItem.push(examList[i]);
				}
			}

			deferred.resolve(tempExamItem);

		}, 1000);
		return deferred.promise;
	}

	UserService.getMyExamList = function() {

		var deferred = $q.defer();
		$timeout(function() {
			var currUserObj = UserService
					.getUserById($localStorage.loggedinUser.userId);
			deferred.resolve(currUserObj.exam);
		}, 1000);

		return deferred.promise;
	}

	UserService.getMyPracticeExamsbyID = function(currentUserID) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];

			var myPracticeExamList = angular.fromJson($localStorage.dbUser);

			if (typeof myPracticeExamList === 'undefined')
				myPracticeExamList = [];

			for (i = 0; i < myPracticeExamList.length; i++) {
				if (currentUserID == myPracticeExamList[i].userId) {
					tempItem.push(myPracticeExamList[i].exam);
				}
			}
			deferred.resolve(tempItem[0]);
			$log.debug("tempItem :" + angular.toJson(tempItem[0]));

		}, 1000);
		return deferred.promise;
	}

	return serviceFactory;
}

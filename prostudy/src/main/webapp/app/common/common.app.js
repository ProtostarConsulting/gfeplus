var app = angular.module("prostudyApp", [ 'ngMaterial', 'ngMdIcons',
		'ngMessages', "ui.bootstrap", "ui.router", 'ngMaterialDatePicker',
		'md.data.table', 'ngResource', 'ngRoute', 'ngStorage', "ngAria",
		"ngSanitize", 'textAngular', 'directive.g+signin', 'ngFileUpload' ]);

// Set up the cache ‘ajsCache’
app.factory('ajsCache', function($cacheFactory) {
	return $cacheFactory('browserCache');
});

app.run(function($window, $rootScope) {
	$rootScope.online = navigator.onLine;
	$window.addEventListener("offline", function() {
		$rootScope.$apply(function() {
			$rootScope.online = false;
		});
	}, false);
	$window.addEventListener("online", function() {
		$rootScope.$apply(function() {
			$rootScope.online = true;
		});
	}, false);
});

/*
 * app.config(function($mdThemingProvider) {
 * $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette(
 * 'red').warnPalette('pink').backgroundPalette('grey'); });
 */

app.config(function($mdThemingProvider) {

	/*
	 * Available palettes: red, pink, purple, deep-purple, indigo, blue,
	 * light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange,
	 * deep-orange, brown, grey, blue-grey
	 */
	$mdThemingProvider.theme('default').primaryPalette('light-blue')
			.accentPalette('pink').warnPalette('red');
	;
	$mdThemingProvider.theme('red').primaryPalette('red').accentPalette(
			'orange').warnPalette('blue');
	$mdThemingProvider.theme('pink').primaryPalette('pink').accentPalette(
			'orange').warnPalette('red');
	$mdThemingProvider.theme('purple').primaryPalette('purple').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('deep-purple').primaryPalette('deep-purple')
			.accentPalette('grey').warnPalette('red');
	$mdThemingProvider.theme('indigo').primaryPalette('indigo').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('blue').primaryPalette('blue').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('light-blue').primaryPalette('light-blue')
			.accentPalette('grey').warnPalette('red');
	$mdThemingProvider.theme('cyan').primaryPalette('cyan').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('teal').primaryPalette('teal').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('green').primaryPalette('green').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('light-green').primaryPalette('light-green')
			.accentPalette('grey').warnPalette('red');
	$mdThemingProvider.theme('lime').primaryPalette('lime').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('yellow').primaryPalette('yellow').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('amber').primaryPalette('amber').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('orange').primaryPalette('orange').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('deep-orange').primaryPalette('deep-orange')
			.accentPalette('grey').warnPalette('red');
	$mdThemingProvider.theme('brown').primaryPalette('brown').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('grey').primaryPalette('grey').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('blue-grey').primaryPalette('blue-grey')
			.accentPalette('grey').warnPalette('red');

	// Custom Themes
	$mdThemingProvider.definePalette('grfPaletteName', {
		'50' : '#9fd6db',
		'100' : '#8cced4',
		'200' : '#79c6cd',
		'300' : '#67bec6',
		'400' : '#54b6bf',
		'500' : '#44acb6',
		'600' : '#3d9aa3',
		'700' : '#368991',
		'800' : '#2f777e',
		'900' : '#28666c',
		'A100' : '#b1dee2',
		'A200' : '#c4e6e9',
		'A400' : '#d6eef0',
		'A700' : '#215459',
		'contrastDefaultColor' : 'light', // whether, by default, text
		// (contrast)
		// on this palette should be
		// dark or light
		'contrastDarkColors' : [ '50', '100', // hues which contrast should be
		// 'dark' by default
		'200', '300', '400', 'A100' ],
		'contrastLightColors' : undefined
	// could also specify this if
	// default was 'dark'
	});

	$mdThemingProvider.theme('grf-theme').primaryPalette('grfPaletteName')
			.accentPalette('cyan').warnPalette('red');
	// This is the absolutely vital part, without this, changes will not cascade
	// down through the DOM.
	$mdThemingProvider.alwaysWatchTheme(true);
});

app.config(function($logProvider) {
	// $logProvider.debugEnabled(false);
	$logProvider.debugEnabled(true);// this is default
});
app
		.config(function($stateProvider, $urlRouterProvider) {
			// This adds config 2
			// For any unmatched url, redirect to /state1
			$urlRouterProvider.otherwise("/welcome");

			// Now set up the states
			$stateProvider
					.state('home', {
						url : "/home",
						templateUrl : '/home.html',
						controller : 'homeCtr'
					})
					.state('welcome', {
						url : "/welcome",
						templateUrl : '/welcome.html',
						controller : 'homeCtr'
					})
					.state('setup', {
						url : "/setup",
						templateUrl : '/app/setup/setup_module.html',
						controller : 'setupModuleCtr'
					})
					.state('setup.authorityView', {
						url : "/viewauthority",
						templateUrl : '/app/authority/authority_view.html',
						controller : 'authorityViewCtr'
					})
					.state('setup.changeTheme', {
						url : "/changeTheme/:currentInstID",
						templateUrl : '/app/setup/setup_changetheme.html',
						controller : 'changeThemeCtr1'
					})
					.state('setup.instituteView', {
						url : "/instituteView/:currentInstID",
						templateUrl : '/app/institute/institute_view.html',
						controller : 'instituteViewCtr'
					})

					.state('setup.addInstituteUser', {
						url : "/addInstituteUser",
						templateUrl : '/app/setup/addInstituteUser.html',
						controller : 'addInstituteUserCtr',
						params : {
							selectedPSchool : null,
							selectedPSchoolInstitute : null
						}
					})
					.state('setup.editInstitute', {
						url : "/editInstitute",
						templateUrl : '/app/setup/editInstitute.html',
						controller : 'editInstituteCtr'
					})
					.state('setup.instituteUsersList', {
						url : "/instituteUsersList",
						templateUrl : '/app/setup/instituteUserList.html',
						controller : 'instituteUserListCtr'
					})
					.state('setup.changePlan', {
						url : "/changePlan",
						templateUrl : '/app/setup/changeplan.html',
						controller : 'changePlanCtr'
					})
					.state('setup.setLogo', {
						url : "/setLogo",
						templateUrl : '/app/setup/setLogo.html',
						controller : 'setLogoCtr'
					})
					.state('setup.userauth', {
						url : "/userauth/:selectedUserEmailId",
						templateUrl : '/app/setup/manage_user_auth.html',
						controller : 'manageUserAuthCtr'
					})
					.state('setup.set_examyear', {
						url : "/set_examyear",
						templateUrl : '/app/setup/setup_set_examyear.html',
						controller : 'setExamYearCtr'
					})
					.state('institute.editAUser', {
						url : "/editAUser/:selectedGFUserID",
						templateUrl : '/app/institute/institute_editUser.html',
						controller : 'userEditCtr'
					})

					.state('exam', {
						url : "/exam",
						templateUrl : '/app/exam/exam_module.html',
						controller : 'examModuleCtr'
					})
					.state('exam.addnewquestion', {
						url : "/addnewquestion/:flag",
						templateUrl : '/app/exam/newQuestion_add.html',
						controller : 'addNewQuestionCtr',
						params : {
							sourceSate : null,
							selectedExamId : null,
							selectedStd : null,
							selectedDiv : null,
							selectedSub : null,
							selectedBoard : null
						}
					})
					.state('exam.questionlist', {
						url : "/question_list",
						templateUrl : '/app/exam/question_list.html',
						controller : 'questionListCtr'
					})
					.state('exam.editquestion', {
						url : "/question_edit",
						templateUrl : '/app/exam/question_edit.html',
						controller : 'editQuestionCtr',
						params : {
							sourceSate : null,
							selectedExamId : null,
							selectedQuestionId : null,
							selectedQuestion : null

						}
					})
					.state('exam.addpracticeexam', {
						url : "/addpracticeexam",
						templateUrl : '/app/exam/practiceExam_add.html',
						controller : 'addPracticeExamCtr'
					})
					.state('exam.listpracticeexam', {
						url : "/listpracticeexam",
						templateUrl : '/app/exam/practiceExam_list.html',
						controller : 'practiceExamListCtr'
					})
					.state('exam.viewpracticeexam', {
						templateUrl : '/app/exam/practiceExam_list.html',
						controller : 'practiceExamListCtr'
					})
					.state('exam.editpracticeexam', {
						url : "/editpracticeexam/:selectedExamId",
						templateUrl : '/app/exam/practiceExam_edit.html',
						controller : 'editPracticeExamCtr',
						params : {

							addedQ : null,
							updatedQ : null,
							selectedExamId : null,
							selectedQuestionId : null,
							addFlag : null,
							editFlag : null,
							selectedStd : null,
							selectedDiv : null,
							selectedSub : null,
							selectedBoard : null
						}

					})
					.state('exam.practiceexamtest', {
						url : "/practiceexam",
						templateUrl : '/app/exam/practiceExamTest.html',
						controller : 'practiceExamTestCtr',
						params : {
							selectedExamId : '',
							foundSchool : null
						}
					})
					.state('exam.view', {
						url : "/exam/view",
						templateUrl : '/app/exam/exam_view.html',
						controller : 'examCtr'
					})
					.state(
							'userQuesAnsView',
							{
								url : "/userQuesAnsView/:selectedExamId/:selectedResultId/:flag",
								templateUrl : '/app/exam/userQuesAns_view.html',
								controller : 'userQuesAnsViewCtr'
							})
					.state('exam.question', {
						url : "/question",
						templateUrl : '/app/question/question_add.html',
						controller : 'questionCtr'
					})
					.state('examdemo', {
						url : "/examdemo",
						templateUrl : '/app/examdemo/examdemo_module.html',
						controller : 'examDemoModuleCtr'
					})
					.state('examdemo.science', {
						url : "/science",
						templateUrl : '/app/examdemo/examdemo_science.html',
						controller : 'examDemoScienceCtr'
					})
					.state('examdemo.math', {
						url : "/math",
						templateUrl : '/app/examdemo/examdemo_math.html',
						controller : 'examDemoMathCtr'
					})
					.state('myprofile', {
						url : "/myprofile",
						templateUrl : '/app/myprofile/myprofile.html',
						controller : 'myProfileCtr'
					})
					.state('quickstart', {
						url : "/quickstart",
						templateUrl : '/app/myprofile/quickstart.html',
						controller : 'quickstartCtr'
					})
					.state('email', {
						url : "/email",
						templateUrl : '/app/myprofile/testemail.html',
						controller : ''
					})
					.state('institute', {
						url : "/institute",
						templateUrl : '/app/institute/institute_module.html',
						controller : 'instituteModuleCtr'
					})
					.state('institute.addauthority', {
						url : "/addauthority/:currentInstID",
						templateUrl : '/app/institute/authority_add.html',
						controller : 'authorityAddCtr'
					})
					/*
					 * .state('institute.addInfo', { url : "/institute/addInfo",
					 * templateUrl : '/app/institute/institute_addInfo.html',
					 * controller : 'instituteAddInfoCtr' })
					 */
					.state(
							'institute.addAdmins',
							{
								url : "/institute/addAdmins/:currentInstID",
								templateUrl : '/app/institute/institute_addAdmins.html',
								controller : 'instituteAddInfoCtr'
							})
					.state(
							'institute.addTeachers',
							{
								url : "/institute/addTeachers/:currentInstID",
								templateUrl : '/app/institute/institute_addTeachers.html',
								controller : 'instituteAddInfoCtr'
							})
					.state(
							'institute.addStudents',
							{
								url : "/institute/addStudents",
								templateUrl : '/app/institute/institute_addStudents.html',
								controller : 'instituteAddStudCtr',
								params : {
									currentInstID : null
								}
							})
					.state(
							'institute.studFillbasics',
							{
								url : "/institute/fillbasics",
								templateUrl : '/app/institute/institute_student_fillbasics.html',
								controller : 'instituteStudentFillbasicsCtr',
								params : {
									currstud : null,
									currentInstID : null
								}
							})
					.state(
							'institute.addStandards',
							{
								url : "/institute/addStandards/:currentInstID",
								templateUrl : '/app/institute/institute_addStandards.html',
								controller : 'instituteAddInfoCtr'
							})
					.state(
							'institute.addDivisions',
							{
								url : "/institute/addDivisions/:currentInstID/:currentStdID",
								templateUrl : '/app/institute/institute_addDivisions.html',
								controller : 'instituteAddInfoCtr'
							})
					.state(
							'institute.addSubjects',
							{
								url : "/institute/addSubjects/:currentInstID/:currentStdID/:currentDivID",
								templateUrl : '/app/institute/institute_addSubjects.html',
								controller : 'instituteAddInfoCtr'
							})
					/*
					 * .state('institute.list', { url : "/list", templateUrl :
					 * '/app/institute/institute_list.html', controller :
					 * 'instituteListCtr' })
					 */
					.state('institute.view', {
						url : "/view",
						templateUrl : '/app/institute/institute_view.html',
						controller : 'instituteViewCtr'
					})
					.state(
							'institute.list_view',
							{
								url : "/list_view/:selectedInstituteID",
								templateUrl : '/app/institute/institute_list_view.html',
								controller : 'instituteListViewCtr'
							})
					.state(
							'institute.list_view.editInstitute',
							{
								url : "/editInstitute/:selectedGFUserID",
								templateUrl : '/app/institute/institute_editInstitute.html',
								controller : 'instituteListViewCtr'
							})
					.state(
							'institute.list_view.studentBySubject',
							{
								url : "/viewstudentBySubject/:selectedStdName/:selectedDivName/:selectedSubName/:selectedSubId",
								templateUrl : '/app/institute/institute_view_studentsBySubject.html',
								controller : 'instituteListViewCtr',
							})
					.state(
							'institute.list_view.view_admin',
							{
								url : "/view_admin",
								templateUrl : '/app/institute/institute_view_admins.html',
								controller : 'instituteListViewCtr'
							})
					.state(
							'institute.list_view.view_admin.addadmins',
							{
								url : "/addadmins",
								templateUrl : '/app/institute/institute_addAdmins.html',
								controller : 'instituteListViewCtr'
							})
					.state(
							'institute.list_view.view_teachers',
							{
								url : "/view_teachers",
								templateUrl : '/app/institute/institute_view_teachers.html',
								controller : 'instituteListViewCtr'
							})
					.state(
							'institute.list_view.view_teachers.addteachers',
							{
								url : "/addteachers",
								templateUrl : '/app/institute/institute_addTeachers.html',
								controller : 'instituteListViewCtr'
							})
					.state(
							'institute.list_view.view_students',
							{
								url : "/view_students",
								templateUrl : '/app/institute/institute_view_students.html',
								controller : 'instituteListViewCtr'
							})
					.state(
							'institute.list_view.view_students.addstudents',
							{
								url : "/addstudents",
								templateUrl : '/app/institute/institute_addStudents.html',
								controller : 'instituteListViewCtr'
							})
					.state(
							'institute.list_view.view_standards',
							{
								url : "/view_standards/:selectedStdID",
								templateUrl : '/app/institute/institute_view_standards.html',
								controller : 'instituteListViewCtr',
							})

					.state('institute.list_view.view_setLogo', {
						url : "/view_setLogo/:selectedInstituteID",
						templateUrl : '/app/setup/setLogo.html',
						controller : 'instituteListViewCtr',
					})

					.state(
							'institute.list_view.view_standards.addstandards',
							{
								url : "/addstandards/:currentInstID",
								templateUrl : '/app/institute/institute_addStandards.html',
								controller : 'instituteListViewCtr'
							})
					.state(
							'institute.list_view.view_divisions',
							{
								url : "/view_divisions/:selectedStdID/:selectedDivisionId/:selectedStdName",
								templateUrl : '/app/institute/institute_view_divisions.html',
								controller : 'instituteListViewCtr',
							})
					.state(
							'institute.list_view.view_divisions.adddivisions',
							{
								url : "/adddivisions/:currentInstID/:currentStdID",
								templateUrl : '/app/institute/institute_addDivisions.html',
								controller : 'instituteListViewCtr'
							})
					.state(
							'institute.list_view.view_subjects',
							{
								url : "/view_subjects/:selectedDivID/:selectedStdName/:selectedDivName/:selectedSubName",
								templateUrl : '/app/institute/institute_view_subjects.html',
								controller : 'instituteListViewCtr',
							})
					.state(
							'institute.list_view.view_subjects.addsubjects',
							{
								url : "/addsubjects/:currentInstID/:selectedDivID",
								templateUrl : '/app/institute/institute_addSubjects.html',
								controller : 'instituteListViewCtr'
							})
					.state('institute.list_view.editUser', {
						url : "/editUser/:selectedEmailID/:currentInstID",
						templateUrl : '/app/institute/institute_editUser.html',
						controller : 'userEditCtr',
					})
					.state(
							'institute.view.view_admins',
							{
								url : "/view_admin",
								templateUrl : '/app/institute/institute_view_admins.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.view_admins.addadmins',
							{
								url : "/addadmins",
								templateUrl : '/app/institute/institute_addAdmins.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.view_teachers',
							{
								url : "/view_teachers",
								templateUrl : '/app/institute/institute_view_teachers.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.view_teachers.addteachers',
							{
								url : "/addteachers",
								templateUrl : '/app/institute/institute_addTeachers.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.view_students',
							{
								url : "/view_students",
								templateUrl : '/app/institute/institute_view_students.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.view_students.addstudents',
							{
								url : "/addstudents",
								templateUrl : '/app/institute/institute_addStudents.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.view_standards',
							{
								url : "/view_standards/:selectedStdID",
								templateUrl : '/app/institute/institute_view_standards.html',
								controller : 'instituteViewCtr',
							})
					.state(
							'institute.view.view_standards.addstandards',
							{
								url : "/addstandards/:currentInstID",
								templateUrl : '/app/institute/institute_addStandards.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.view_divisions',
							{
								url : "/view_divisions/:selectedStdID/:selectedDivisionId/:selectedStdName",
								templateUrl : '/app/institute/institute_view_divisions.html',
								controller : 'instituteViewCtr',
							})
					.state(
							'institute.view.view_divisions.adddivisions',
							{
								url : "/adddivisions/:currentInstID/:currentStdID",
								templateUrl : '/app/institute/institute_addDivisions.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.view_subjects',
							{
								url : "/view_subjects/:selectedStdID/:selectedDivID/:selectedSubjectId/:selectedStdName/:selectedDivName/:selectedSubId",
								templateUrl : '/app/institute/institute_view_subjects.html',
								controller : 'instituteViewCtr',
							})
					.state(
							'institute.view.view_subjects.addsubjects',
							{
								url : "/addsubjects/:currentInstID/:selectedDivID",
								templateUrl : '/app/institute/institute_addSubjects.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.editInstitute',
							{
								url : "/editInstitute",
								templateUrl : '/app/institute/institute_editInstitute.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.studentBySubject',
							{
								url : "/viewstudentBySubject/:selectedStdName/:selectedDivName/:selectedSubName/:selectedSubId",
								templateUrl : '/app/institute/institute_view_studentsBySubject.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'institute.view.studentBySubject.addstudentsByStd',
							{
								url : "/addstudentsByStd",
								templateUrl : '/app/institute/institute_addStudents.html',
								controller : 'instituteViewCtr',
							})
					.state('institute.view.editUser', {
						url : "/editUser/:selectedEmailID/:currentInstID",
						templateUrl : '/app/institute/institute_editUser.html',
						controller : 'userEditCtr',
					})
					.state('institute.view.viewUser', {
						url : "/viewUser/:selectedID/:selectedInstituteID",
						templateUrl : '/app/institute/institute_viewUser.html',
						controller : 'userViewCtr',
					})
					.state('attendance', {
						url : "/attendance",
						templateUrl : '/app/attendance/attendance_module.html',
						controller : 'attendanceModuleCtr'
					})
					.state('attendance.add', {
						url : "/addAttendance",
						templateUrl : '/app/attendance/attendance_add.html',
						controller : 'attendanceAddCtr'
					})
					.state(
							'attendance.reportByStudent',
							{
								url : "/attendanceReportbyStudent",
								templateUrl : '/app/attendance/attendance_reportByStudent.html',
								controller : 'reportByStudentCtr'
							})
					.state(
							'attendance.reportBySubjectClass',
							{
								url : "/attendanceReportbyClass",
								templateUrl : '/app/attendance/attendance_reportBySubjectClass.html',
								controller : 'reportBySubjectClassCtr',
							})
					.state('report', {
						url : "/report",
						templateUrl : '/app/report/report_module.html',
						controller : 'reportModuleCtr'
					})
					.state('report.display', {
						url : "/report/display",
						templateUrl : '/app/report/display_report.html',
						controller : 'displayReportCtr'
					})
					.state('chapter', {
						url : "/chapter",
						templateUrl : "/app/chapter/chapter_module.html",
						controller : 'chapterModuleCtr'
					})
					.state('chapter.add', {
						url : "/add",
						templateUrl : "/app/chapter/chapter_add.html",
						controller : 'chapterAddCtr'
					})
					.state('chapter.list', {
						url : "/list",
						templateUrl : "/app/chapter/chapter_list.html",
						controller : 'chapterListCtr'
					})
					.state('chapter.edit', {
						url : "/edit/:selectedChapterId",
						templateUrl : "/app/chapter/chapter_edit.html",
						controller : 'chapterListCtr'
					})
					.state('chapter.view', {
						url : "/view/:selectedChapterId",
						templateUrl : "/app/chapter/chapter_view.html",
						controller : 'chapterViewCtr'
					})
					.state('book', {
						url : "/book",
						templateUrl : "/app/book/book_module.html",
						controller : 'bookModuleCtr'
					})
					.state('book.add', {
						url : "/add",
						templateUrl : "/app/book/book_add.html",
						controller : 'bookAddCtr'
					})
					.state('book.list', {
						url : "/list",
						templateUrl : "/app/book/book_list.html",
						controller : 'bookListCtr',
						params : {
							standard : null,
							division : null,
							subject : null
						}
					})
					.state('book.viewbookpdf', {
						url : "/viewbookpdf",
						templateUrl : "/app/book/book_viewpdf.html",
						controller : 'viewPDFBookCtr',
						params : {
							blobKey : null
						}
					})

					.state('book.edit', {
						url : "/edit/:selectedBookId",
						templateUrl : "/app/book/book_edit.html",
						controller : 'bookEditCtr',
						params : {
							standard : null,
							division : null,
							subject : null
						}
					})
					.state('book.chapterList', {
						url : "/chapterList/:selectedBookId/:flag",
						templateUrl : "/app/book/book_chapterList.html",
						controller : 'book_chapterListCtr'
					})
					.state('book.chapterList.addcomment', {
						url : "/addcomment/:selectedBookId",
						templateUrl : "/app/book/book_addComments.html",
						controller : 'bookCommentAddCtr'
					})
					.state('book.view', {
						url : "/view/:selectedBookId/:selectedChapterId",
						templateUrl : "/app/book/book_viewChapterContent.html",
						controller : 'book_viewChapterContentCtr'
					})
					.state('book.standard', {
						url : "/standard",
						templateUrl : "/app/book/standard_book.html",
						controller : 'standardBookCtr'
					})
					.state('book.standard_chapterList', {
						url : "/standard_chapterList/:selectedBookId/:selectedBookBlobKey",
						templateUrl : "/app/book/standard_chapterList.html",
						controller : 'standard_chapterListCtr'
					})
					.state(
							'book.standard_view',
							{
								url : "/standard_view/:selectedBookId/:selectedChapterId",
								templateUrl : "/app/book/standard_viewChapterContent.html",
								controller : 'standard_viewChapterContentCtr'
							})
					.state('login', {
						url : "/login",
						templateUrl : '/app/login/login_module.html',
						controller : 'loginModuleCtr'
					})
					.state('updatemyprofile', {
						url : "/updatemyprofile/:flag",
						templateUrl : '/app/myprofile/myprofile_update.html',
						controller : 'updateMyProfileCtr'
					})
					.state('newUserTeacher', {
						url : "/newUserTeacher",
						templateUrl : '/app/login/newUser.html',
						controller : 'loginModuleCtr'
					})
					.state('needRegisterInstitute', {
						url : "/needRegisterInstitute",
						templateUrl : '/app/login/needRegisterInstitute.html',
						controller : 'loginModuleCtr'
					})
					.state('newUserStudent', {
						url : "/newUserStudent",
						templateUrl : '/app/login/newUser.html',
						controller : 'newUserStudentCtr'
					})
					.state('favourite', {
						url : "/favourite",
						templateUrl : '/app/favourite/favourite_module.html',
						controller : 'favouriteModuleCtr'
					})
					.state('favourite.myBooks', {
						url : "/myBooks",
						templateUrl : '/app/favourite/myBooks.html',
						controller : 'myBooksCtr'
					})
					.state('favourite.myPracticeExams', {
						url : "/myPracticeExams",
						templateUrl : '/app/favourite/myPracticeExams.html',
						controller : 'myPracticeExamsCtr'
					})
					.state(
							'favourite.practiceExamResultView',
							{
								url : "/practiceExamResultView/:selectedStudEmail",
								templateUrl : '/app/favourite/practiceExamResult_view.html',
								controller : 'practiceExamResultCtr'
							})
					.state('student', {
						url : "/student",
						templateUrl : '/app/student/student_module.html',
						controller : 'studentModuleCtr'
					})
					.state(
							'student.add',
							{
								url : "/addstudent",
								templateUrl : '/app/institute/institute_addStudents.html',
								controller : 'instituteAddStudCtr'
							})
					.state('student.list', {
						url : "/list",
						templateUrl : '/app/student/student_list.html',
						controller : 'studentListPageCtr'
					})
					.state('student.edit', {
						url : "/edit",
						templateUrl : '/app/institute/institute_editUser.html',
						controller : 'userEditCtr',
						params : {
							selectedEmailID : null,
							currentInstID : null
						}
					})
					.state('student.view', {
						url : "/view",
						templateUrl : '/app/student/student_view.html',
						controller : 'studentViewCtr',
						params : {
							selectedStudEmailId : null,
							selectedID : null
						}
					})
					.state('student.addstudentpayment', {
						url : "/addstudentpayment",
						templateUrl : '/app/student/student_addpayment.html',
						controller : 'studentAddPaymentCtr',
						params : {
							selectedStud : null
						}
					})
					.state('student.studentpaymentlist', {
						url : "/studentPaymentlist",
						templateUrl : '/app/student/student_paymentlist.html',
						controller : 'studentPaymentListCtr',
					})
					.state(
							'student.studentInstallmentedit',
							{
								url : "/studentInstallmentedit",
								templateUrl : '/app/student/student_installmentedit.html',
								controller : 'studentInstallmentEditCtr',
								params : {
									selectedInstallment : null,
									selectedPaymentId : null
								}
							})
					.state(
							'student.studentinstallmentlist',
							{
								url : "/studentinstallmentlist/:selectedPaymentId",
								templateUrl : '/app/student/student_installmentlist.html',
								controller : 'studentInstallmentListCtr',

							})
					.state('student.scheduleStudentExam', {
						url : "/scheduleStudentExam",
						templateUrl : '/app/student/student_scheduleExam.html',
						controller : 'studentListPageCtr',

					})
					.state('syllabus', {
						url : "/syllabus",
						templateUrl : '/app/syllabus/syllabus_module.html',
						controller : 'syllabusModuleCtr'
					})
					.state(
							'syllabus.addsyllabus',
							{
								url : "/addsyllabus",
								templateUrl : '/app/syllabus/syllabus_addsyllabus.html',
								controller : 'syllabusAddCtr'

							})
					.state(
							'syllabus.viewsyllabus',
							{
								url : "/viewsyllabus",
								templateUrl : '/app/syllabus/syllabus_viewsyllabus.html',
								controller : 'syllabusViewCtr'

							})
					.state(
							'syllabus.listsyllabus',
							{
								url : "/listsyllabus",
								templateUrl : '/app/syllabus/syllabus_listsyllabus.html',
								controller : 'syllabusListCtr'

							})
					.state('book.addselectedbook', {
						url : "/addselectedbook/:addselectedBookId",
						templateUrl : '/app/book/book_list.html',
						controller : 'bookListCtr'

					})
					.state(
							'certificateMgmt',
							{
								url : "/certificateMgmt",
								templateUrl : '/app/certificateMgmt/certificate_module.html',
								controller : 'certificateModuleCtr'
							})
					.state(
							'certificateMgmt.generateTemplate',
							{
								url : "/generateTemplate/:selectedStudID/:selectedfirstName/:selectedlastName/:selectedExam/:selectedScore",
								templateUrl : '/app/certificateMgmt/generateTemplate.html',
								controller : 'generateTemplateCtr'
							})
					.state(
							'certificateMgmt.generateCertificate',
							{
								url : "/generateCertificate",
								templateUrl : '/app/certificateMgmt/generateCertificate.html',
								controller : 'generateCertificateCtr'
							})
					.state(
							'certificateMgmt.viewCertificate',
							{
								url : "/viewCertificate",
								templateUrl : '/app/certificateMgmt/viewCertificate.html',
								controller : 'viewCertificateCtr'
							})
					.state(
							'admissionMgmt',
							{
								url : "/admissionMgmt",
								templateUrl : '/app/admissionMgmt/admission_module.html',
								controller : 'admissionMgmtModuleCtr'
							})
					.state('applicant.add', {
						url : "/addApplicant",
						templateUrl : '/app/admissionMgmt/applicant_add.html',
						controller : 'applicantAddCtr'
					})
					.state('applicant.list', {
						url : "/applicantList",
						templateUrl : '/app/admissionMgmt/applicant_list.html',
						controller : 'applicantListCtr'
					})
					.state('gfeIndex', {
						url : "/gfeIndex",
						templateUrl : '/app/gfe/gfe_index.html',
						controller : 'gfeIndexCtr'
					})
					.state('gfe', {
						url : "/gfe/:user",
						templateUrl : '/app/gfe/gfe_module.html',
						controller : 'gfeModuleCtr'
					})
					.state('gfe.classroomNewCourse', {
						url : "/classroomNewCourse",
						templateUrl : '/app/gfe/classroom_new_course.html',
						controller : 'classroomNewCourseCtr'
					})
					.state('gfe.classroomCourseList', {
						url : "/classroomCourseList",
						templateUrl : '/app/gfe/classroom_list.html',
						controller : 'classroomCourseListCtr'
					})
					.state('gfe.classroomCourseUserList', {
						url : "/classroomCourseUserList",
						templateUrl : '/app/gfe/classroom_list_users.html',
						controller : 'classroomCourseUserListCtr',
						params : {
							userType : null,
							selectedCourseId : null,
							courseName : null
						}
					})
					.state('gfe.classroomCourseAddNewUser', {
						url : "/classroomCourseAddNewUser/:selectedCourseId",
						templateUrl : '/app/gfe/classroom_new_user.html',
						controller : 'classroomNewUserCtr',
						params : {
							userType : null,
							selectedCourseId : null,
							courseName : null
						}
					})
					.state(
							'gfe.classroomCourseViewUser',
							{
								url : "/classroomCourseViewUser",
								templateUrl : '/app/gfe/classroom_course_viewUser.html',
								controller : 'classroomViewUserCtr',
								params : {
									selectedUserId : null,
									selectedCourseId : null,
									userType : null,
									selectedCourse : null
								}
							})
					.state('gfe.classroomCourseEdit', {
						url : "/classroomCourseEdit",
						templateUrl : '/app/gfe/classroom_course_edit.html',
						controller : 'classroomCourseEditCtr',
						params : {
							selectedCourse : null
						}
					})
					.state('gfe.classroomCourseView', {
						url : "/classroomCourseView",
						templateUrl : '/app/gfe/classroom_course_view.html',
						controller : 'classroomCourseViewCtr',
						params : {
							selectedCourse : null
						}
					})
					.state(
							'gfe.directoryNewUser',
							{
								url : "/directoryNewUser",
								templateUrl : '/app/gfe/directory_new_userAccount.html',
								controller : 'directoryNewUserAccountCtr',
								params : {
									currentUserDomain : null
								}
							})
					.state(
							'gfe.directoryViewUser',
							{
								url : "/directoryViewUser",
								templateUrl : '/app/gfe/directory_view_userAccount.html',
								controller : 'directoryViewUserAccountCtr',
								params : {
									selectedUserPrimaryEmail : null
								}
							})
					.state(
							'gfe.directoryEditUser',
							{
								url : "/directoryEditUser",
								templateUrl : '/app/gfe/directory_edit_userAccount.html',
								controller : 'directoryEditUserAccountCtr',
								params : {
									selectedUser : null
								}
							})
					.state('gfe.directoryUserList', {
						url : "/directoryUserList",
						templateUrl : '/app/gfe/directory_user_list.html',
						controller : 'directoryUserListCtr'
					})
					.state(
							'partnerSchool',
							{
								url : "/partnerSchool",
								templateUrl : '/app/gfschool/partnerSchool_module.html',
								controller : 'partnerSchoolModuleCtr'
							})
					.state('partnerSchool.addPartnerSchool', {
						url : "/addPartnerSchool/:selectedPSchoolId",
						templateUrl : '/app/gfschool/partnerSchool_add.html',
						controller : 'partnerSchoolAddCtr',
						params : {
							selectedPSchool : null
						}
					})
					.state('partnerSchool.print', {
						url : "/print/:yearOfExam",
						templateUrl : '/app/gfschool/printBookDetail.html',
						controller : 'printBookDtailCtr',
						params : {
							selectedSchoolObj : null,
							bookStocks : null
						}
					})
					.state('partnerSchool.printAddress', {
						url : "/printAddress/:yearOfExam",
						templateUrl : '/app/gfschool/printAddress.html',
						controller : 'printBookDtailCtr',
						params : {
							selectedSchoolObj : null
						}
					})
					.state('partnerSchool.listPartnerSchool', {
						url : "/listPartnerSchool/:selectedPSchoolId",
						templateUrl : '/app/gfschool/partnerSchool_list.html',
						controller : 'partnerSchoolListCtr'
					})
					.state(
							'partnerSchool.listPartnerSchoolStudent',
							{
								url : "/listPartnerSchoolStudent",
								templateUrl : '/app/gfschool/partnerSchool_studentList.html',
								controller : 'studentListPageCtr'
							})
					.state(
							'partnerSchool.schoolRegisterWithoutLogin',
							{
								url : "/addPartnerSchoolWithoutLogin",
								templateUrl : '/app/gfschool/school_Registration.html',
								controller : 'schoolRegisterAddCtr'
							})
					.state(
							'partnerSchool.addPartnerSchoolInstitue',
							{
								url : "/addPartnerSchoolInstitue/:selectedPSchoolInstituteId",
								templateUrl : '/app/gfschool/partnerSchool_institue_add.html',
								controller : 'partnerSchool_Institue_AddCtr',
								params : {
									selectedPSchoolInstitute : null
								}
							})		
					.state(
							'partnerSchool.listPartnerSchoolInstitue',
							{
								url : "/listPartnerSchoolInstitue",
								templateUrl : '/app/gfschool/partnerSchool_institue_list.html',
								controller : 'partnerSchool_Institue_ListCtr'
							})				
					.state(
							'scheduledExam',
							{
								url : "/scheduledExam",
								templateUrl : '/app/scheduledExam/scheduledExam_module.html',
								controller : 'scheduledExamModuleCtr'
							})
					.state(
							'scheduledExam.addQuestion',
							{
								url : "/addQuestion",
								templateUrl : '/app/scheduledQuestion/scheduledQuestion_new.html',
								controller : 'scheduledQuestionNewCtr',
								params : {
									sourceSate : null,
									selectedExamId : null,
									selectedInstituteId : null,
									flag : null
								}
							})
					.state(
							'scheduledExam.questionList',
							{
								url : "/questionList",
								templateUrl : '/app/scheduledQuestion/scheduledQuestion_list.html',
								controller : 'scheduledQuestionListCtr'
							})
					.state(
							'scheduledExam.questionEdit',
							{
								url : "/questionEdit",
								templateUrl : '/app/scheduledQuestion/scheduledQuestion_edit.html',
								controller : 'scheduledQuestionEditCtr',
								params : {
									sourceSate : null,
									selectedExamId : null,
									selectedQuestion : null,
									selectedQuestionId : null
								}

							})
					.state(
							'scheduledExam.add',
							{
								url : "/add",
								templateUrl : '/app/scheduledExam/scheduledExam_add.html',
								controller : 'scheduledExamAddCtr'
							})
					.state(
							'scheduledExam.edit',
							{
								url : "/edit",
								templateUrl : '/app/scheduledExam/scheduledExam_edit.html',
								controller : 'editScheduledExamCtr',
								params : {
									selectedExamId : null,
									addedQ : null,
									updatedQ : null,
									selectedQuestionId : null,
									addFlag : null,
									editFlag : null
								}
							})
					.state(
							'scheduledExam.list',
							{
								url : "/scheduledexamlist",
								templateUrl : '/app/scheduledExam/scheduledExam_list.html',
								controller : 'scheduledExamListCtr'
							})
					.state(
							'scheduledExam.liveexams',
							{
								url : "/liveexams",
								templateUrl : '/app/scheduledExam/live_scheduledExamlist.html',
								controller : 'liveScheduledExamListCtr'
							})
					.state(
							'scheduledExam.scheduledtest',
							{
								url : "/scheduledtest",
								templateUrl : '/app/scheduledExam/scheduledExamTest.html',
								controller : 'scheduledExamTestCtr',
								params : {
									selectedExamId : null
								}
							})
					.state(
							'scheduledExam.userQuesAnsView',
							{
								url : "/userQuesAnsView",
								templateUrl : '/app/scheduledExam/scheduledUserQuesAns_view.html',
								controller : 'scheduledUserQuesAnsViewCtr',
								params : {
									selectedExamId : null,
									selectedEmailId : null,
									selectedResultId : null
								}
							})
					.state(
							'scheduledExam.scheduledExamResultView',
							{
								url : "/scheduledExamResultView/:selectedStudEmail",
								templateUrl : '/app/scheduledExam/schduledExamResult_view.html',
								controller : 'scheduledExamResultCtr'
							})
					.state(
							'scheduledExam.resultlist',
							{
								url : "/resultlist",
								templateUrl : '/app/scheduledExam/schduledExamResult_list.html',
								controller : 'scheduledExamResultListCtr',
								params : {

									selectedExamId : null,
									selectedExamTitle : null
								}

							})
					.state(
							'scheduledExam.studentlist',
							{
								url : "/studentlist",
								templateUrl : '/app/scheduledExam/scheduledExam_studentList.html',
								controller : 'scheduledExamStudentListCtr',
								params : {

									selectedExamId : null,
									selectedExamTitle : null
								}
							})
					.state(
							'scheduledExam.assignStudents',
							{
								url : "/assignStudents",
								templateUrl : '/app/scheduledExam/scheduledExam_assignStudents.html',
								controller : 'scheduledExamAssignStudentsCtr'
							})
					.state(
							'scheduledExam.myScheduledExamList',
							{
								url : "/myScheduledExamList/:selectedStudId",
								templateUrl : '/app/scheduledExam/scheduledExam_myScheduledExamList.html',
								controller : 'studentScheduledExamListCtr'
							})
					.state(
							'scheduledExam.addResult',
							{
								url : "/addResult",
								templateUrl : '/app/scheduledExam/scheduledExam_addResult.html',
								controller : 'addScheduledExamResultCtr'
							})

					.state('initsetup', {
						url : "/initsetup",
						templateUrl : '/app/initsetup/initsetup.html',
						controller : 'initsetup',
					})
					.state('proadmin', {
						url : "/proadmin",
						templateUrl : '/app/proadmin/proadmin_module.html',
						controller : 'proAdminModuleCtr'
					})
					.state('proadmin.instituteAddInfo', {
						url : "/addInfo",
						templateUrl : '/app/institute/institute_addInfo.html',
						/*
						 * templateUrl :
						 * '/app/institute/institute_addNewInstitute.html',
						 */
						controller : 'instituteAddInfoCtr'
					})
					.state('proadmin.instituteList', {
						url : "/list",
						templateUrl : '/app/institute/institute_list.html',
						controller : 'instituteListCtr'
					})
					.state('proadmin.manageauthmaster', {
						url : "/manageauthmaster",
						templateUrl : '/app/proadmin/manage_auth_master.html',
						controller : 'proAdminManageAuth'
					})
					.state(
							'proadmin.manageinstituteauth',
							{
								url : "/manageinstituteauth/:selectedInstituteID",
								templateUrl : '/app/proadmin/manage_institute_auth.html',
								controller : 'proAdminManageInstituteAuth'
							})

					.state(
							'gandhifoundation',
							{
								url : "/gandhifoundation",
								templateUrl : '/app/gfstudent/gandhiFoundation_module.html',
								controller : 'gfModuleCtr'
							})

					.state('studentModule', {
						url : "/studentModule",
						templateUrl : '/app/gfstudent/gfStudent_module.html',
						controller : 'gfStudentModuleCtr'
					})
					.state('studentModule.add', {
						url : "/studentModule.add/:selectedGFStudID",
						templateUrl : '/app/gfstudent/gfStudent_add.html',
						controller : 'gfStudentAddCtr'
					})
					.state('studentModule.list', {
						url : "/studentModule.list",
						templateUrl : '/app/gfstudent/gfStudent_list.html',
						controller : 'gfStudentListCtr'
					})
					.state('studentModule.view', {
						url : "/studentModule.view/:selectedGFStudID",
						templateUrl : '/app/gfstudent/gfStudent_view.html',
						controller : 'gfStudentviewCtr'
					})
					.state('studentModule.addExamResult', {
						url : "/addExamResult",
						templateUrl : '/app/gfstudent/examresult_add.html',
						controller : 'gfExamResultAddCtr',
						params : {
							reviewByGrfRegNo : null
						}
					})
					.state('studentModule.printCertificateDetail', {
						url : "/printExamResult",
						templateUrl : '/app/gfstudent/printCertificateDetail.html',
						controller : 'printCertificateDetailCtr',
						params : {
							selectedSchoolObj: null
						}
					})
					.state('studentModule.gvspStartExam', {
						url : "/gvspExamStart",
						templateUrl : '/app/gfstudent/gvsp_start_form.html',
						controller : 'gfStartExamCtr',
						params : {
							reviewByGrfRegNo : null
						}
					})
					.state('studentModule.listExamResult', {
						url : "/listExamResult",
						templateUrl : '/app/gfstudent/examresult_list.html',
						controller : 'gfExamResultListCtr'
					})
					.state('studentModule.viewExamResult', {
						url : "/viewExamResult/:selectedGFStudID",
						templateUrl : 'app/gfstudent/gfStudent_viewExamResult.html',
						controller : 'gfStudentViewExamResult'
					})

					.state('courierModule', {
						url : "/courierModule",
						templateUrl : '/app/gfcourier/gfCourier_module.html',
						controller : 'gfCourierModuleCtr'
					})
					.state('courierModule.add', {
						url : "/courierModule.add",
						templateUrl : '/app/gfcourier/gfCourier_add.html',
						controller : 'gfCourierAddCtr',
						params : {
							selectedGFCourierID : null,
							schoolGRFNo : null
						}

					})
					.state('courierModule.list', {
						url : "/list",
						templateUrl : '/app/gfcourier/gfCourier_list.html',
						controller : 'gfCourierListCtr',

					})
					.state('courierModule.view', {
						url : "/courierModule.view/:selectedGFCourierID",
						templateUrl : '/app/gfcourier/gfCourier_view.html',
						controller : 'gfCourierviewCtr'
					})
					.state('courierModule.search', {
						url : "/courierModule.search/",
						templateUrl : '/app/gfcourier/gfCourier_search.html',
						controller : 'gfCourierSearchCtr'
					})
					.state(
							'courierModule.dailyDispatchReport',
							{
								url : "/courierModule.dailyDispatchReport/",
								templateUrl : '/app/gfcourier/dailyDispatchReport.html',
								controller : 'courierDailyDispatchReportCtr'
							})

					.state('courierModule.report', {
						url : "/courierModule.report/",
						templateUrl : '/app/gfcourier/gfCourier_report.html',
						controller : 'gfCourierReportCtr',
						params : {
							indiaAddressLookupData : null
						}
					})

					.state(
							'courierModule.addFromPS',
							{
								url : "/addFromPS",
								templateUrl : '/app/gfcourier/gfCourier_directAddFromPS.html',
								controller : 'gfCourierDirectAddCtr',
								params : {
									partnerSchool : null,
									yearOfExam : null
								}
							})

					.state('gfreport', {
						url : "/gfreport",
						templateUrl : '/app/gfreport/gfreport_module.html',
						controller : 'gfReportModuleCtr',
					})
					.state('gfreport.gfschool_lists', {
						url : "/gfschool_lists",
						templateUrl : '/app/gfreport/gfschool_lists.html',
						controller : 'schoollistsCtr',
					})
					.state('gfreport.finsummary', {
						url : "/gfreportfinsummary",
						templateUrl : '/app/gfreport/fin_summary.html',
						controller : 'finSummaryCtr',
					})
					.state(
							'gfreport.listExamResult',
							{
								url : "/listExamResult",
								templateUrl : '/app/gfreport/examresult_list_report.html',
								controller : 'gfExamResultListReportCtr'
							})
					.state(
							'bookModule',
							{
								url : "/bookModule",
								templateUrl : '/app/gfbookstock/gfBookStock_module.html',
								controller : 'gfBookStockModuleCtr'
							})
					.state('bookModule.add', {
						url : "/bookModule.add/:selectedGFBookID",
						templateUrl : '/app/gfbookstock/gfBook_add.html',
						controller : 'gfBookAddCtr'
					})
					.state('bookModule.list', {
						url : "/bookModule.list",
						templateUrl : '/app/gfbookstock/gfBook_list.html',
						controller : 'gfBookListCtr'
					})
					.state('bookModule.view', {
						url : "/bookModule.view/:selectedGFBookID",
						templateUrl : '/app/gfbookstock/gfBookStock_view.html',
						controller : 'gfBookStockviewCtr'
					})
					.state('bookModule.viewRecord', {
						url : "/bookModule.selectedBook/:selectedGFBookID",
						templateUrl : '/app/gfbookstock/gfSelectedBookRecord.html',
						controller : 'gfSelectedBookRecordCtr'
					})
					.state('bookModule.stockAdd', {
						url : "/bookModule.stockAdd/:selectedGFBookStockID",
						templateUrl : '/app/gfbookstock/gfBookStock_add.html',
						controller : 'gfBookStockAddCtr'
					})
					.state('bookModule.stockList', {
						url : "/bookModule.stockList",
						templateUrl : '/app/gfbookstock/gfBookStock_list.html',
						controller : 'gfBookStockListCtr'
					})
					.state(
							'bookModule.stockTransaction',
							{
								url : "/bookModule.stockTransaction",
								templateUrl : '/app/gfbookstock/gfBookStockTransaction_list.html',
								controller : 'gfBookstockTransactionListCtr'
							})
		});
app.directive('focusOn', function($timeout) {
	return {
		restrict : 'A',
		link : function($scope, $element, $attr) {
			$scope.$watch($attr.focusOn, function(_focusVal) {
				$timeout(function() {
					_focusVal ? $element.focus() : $element.blur();
				});
			});
		}
	}
});
app.directive("odd", function() {
	return {
		restrict : "A",

		require : "ngModel",

		link : function(scope, element, attributes, ngModel) {
			ngModel.$validators.odd = function(modelValue) {
				return modelValue % 2 === 1;
			}
		}
	};
});

app
		.directive(
				"uniqueGrfFormNumber",
				function($q, appEndpointSF) {
					return {
						restrict : "A",
						require : "ngModel",
						link : function(scope, element, attributes, ngModel) {
							ngModel.$asyncValidators.uniqueGRFFormNumber = function(
									formNumber, selectedPSchoolId) {
								var selectedPSchoolId = attributes.uniqueGrfFormNumber;
								var defer = $q.defer();
								var PartnerSchoolService = appEndpointSF
										.getPartnerSchoolService();
								if (formNumber != "") {
									PartnerSchoolService
											.getPSchoolByFormNumber(formNumber)
											.then(
													function(pSchool) {
														if (pSchool.id == undefined
																|| pSchool.id == selectedPSchoolId)
															defer.resolve();
														else
															defer.reject();
													});
								}

								return defer.promise;
							}
						}
					};
				});
app.directive('capitalize', function() {
	return {
		require : 'ngModel',
		link : function(scope, element, attrs, modelCtrl) {
			var capitalize = function(inputValue) {
				if (inputValue == undefined)
					inputValue = '';
				var capitalized = inputValue.toUpperCase();
				if (capitalized !== inputValue) {
					modelCtrl.$setViewValue(capitalized);
					modelCtrl.$render();
				}
				return capitalized;
			}
			modelCtrl.$parsers.push(capitalize);
			capitalize(scope[attrs.ngModel]); // capitalize initial value
		}
	};
});

app.filter('unique', function() {
	return function(input, key) {
		var unique = {};
		var uniqueList = [];
		for (var i = 0; i < input.length; i++) {
			if (typeof unique[input[i][key]] == "undefined") {
				unique[input[i][key]] = "";
				uniqueList.push(input[i]);
			}
		}
		return uniqueList;
	};
});

app.filter('formatDate', function($filter) {
	return function(inputDate) {
		return $filter('date')(inputDate, 'dd-MM-yyyy');
	};
});
app.filter('formatFullDate', function($filter) {
	return function(inputDate) {
		return $filter('date')(inputDate, 'dd-MM-yyyy HH:MM a');
	};
});
app.filter('trim', function() {
	return function(value) {
		if (!angular.isString(value)) {
			return value;
		}
		return value.replace(/^\s+|\s+$/g, ''); // you could use .trim, but it's
												// not going to work in IE<9
	};
});
app.filter('stripHtml', function() {
	return function(text) {
		return text ? String(text).replace(/<[^>]+>/gm, '') : '';
	};
});
app.filter('first100Chars', function() {
	return function(value) {
		if (!angular.isString(value)) {
			return value;
		}
		return value.length > 100 ? value.substring(0, 99) + '...' : value;
	};
});

app.filter('orderObjectBy', function() {
	return function(input, attribute) {
		if (!angular.isObject(input))
			return input;
		var reverseOrder = attribute.startsWith("-");
		if (reverseOrder)
			attribute = attribute.split("-")[1];
		var array = [];
		for ( var objectKey in input) {
			array.push(input[objectKey]);
		}

		array.sort(function(a, b) {
			a = parseFloat(a[attribute]);
			b = parseFloat(b[attribute]);
			return (a - b) * (reverseOrder ? -1 : 1);
		});
		return array;
	}
});

app.filter('numToWord', function() {
	return function (inputNumber) {
	    var str = new String(inputNumber)
	    var splt = str.split("");
	    var rev = splt.reverse();
	    var once = ['Zero', ' One', ' Two', ' Three', ' Four', ' Five', ' Six', ' Seven', ' Eight', ' Nine'];
	    var twos = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
	    var tens = ['', 'Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];

	    numLength = rev.length;
	    var word = new Array();
	    var j = 0;

	    for (i = 0; i < numLength; i++) {
	        switch (i) {

	            case 0:
	                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
	                    word[j] = '';
	                }
	                else {
	                    word[j] = '' + once[rev[i]];
	                }
	                word[j] = word[j];
	                break;

	            case 1:
	                aboveTens();
	                break;

	            case 2:
	                if (rev[i] == 0) {
	                    word[j] = '';
	                }
	                else if ((rev[i - 1] == 0) || (rev[i - 2] == 0)) {
	                    word[j] = once[rev[i]] + " Hundred ";
	                }
	                else {
	                    word[j] = once[rev[i]] + " Hundred and";
	                }
	                break;

	            case 3:
	                if (rev[i] == 0 || rev[i + 1] == 1) {
	                    word[j] = '';
	                }
	                else {
	                    word[j] = once[rev[i]];
	                }
	                if ((rev[i + 1] != 0) || (rev[i] > 0)) {
	                    word[j] = word[j] + " Thousand";
	                }
	                break;

	                
	            case 4:
	                aboveTens();
	                break;

	            case 5:
	                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
	                    word[j] = '';
	                }
	                else {
	                    word[j] = once[rev[i]];
	                }
	                if (rev[i + 1] !== '0' || rev[i] > '0') {
	                    word[j] = word[j] + " Lakh";
	                }
	                 
	                break;

	            case 6:
	                aboveTens();
	                break;

	            case 7:
	                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
	                    word[j] = '';
	                }
	                else {
	                    word[j] = once[rev[i]];
	                }
	                if (rev[i + 1] !== '0' || rev[i] > '0') {
	                    word[j] = word[j] + " Crore";
	                }                
	                break;

	            case 8:
	                aboveTens();
	                break;

	            //            This is optional. 

	            //            case 9:
	            //                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
	            //                    word[j] = '';
	            //                }
	            //                else {
	            //                    word[j] = once[rev[i]];
	            //                }
	            //                if (rev[i + 1] !== '0' || rev[i] > '0') {
	            //                    word[j] = word[j] + " Arab";
	            //                }
	            //                break;

	            //            case 10:
	            //                aboveTens();
	            //                break;

	            default: break;
	        }
	        j++;
	    }

	    function aboveTens() {
	        if (rev[i] == 0) { word[j] = ''; }
	        else if (rev[i] == 1) { word[j] = twos[rev[i - 1]]; }
	        else { word[j] = tens[rev[i]]; }
	    }

	    word.reverse();
	    var finalOutput = '';
	    for (i = 0; i < numLength; i++) {
	        finalOutput = finalOutput + word[i];
	    }
	    return finalOutput;
	}
});

/*
 * app.filter('orderByGRFRegNo', function() { return function(input, attribute) {
 * if (!angular.isObject(input)) return input; var reverseOrder =
 * attribute.startsWith("-"); if (reverseOrder) attribute =
 * attribute.split("-")[1]; var array = []; for ( var objectKey in input) {
 * array.push(input[objectKey]); }
 * 
 * array.sort(function(a, b) { a = parseInt(a[attribute].split("-")[2]); b =
 * parseInt(b[attribute].split("-")[2]); return (a - b) * (reverseOrder ? -1 :
 * 1); }); return array; } });
 */
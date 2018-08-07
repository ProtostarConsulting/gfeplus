package com.protostar.prostudy.until;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.googlecode.objectify.ObjectifyService;
import com.protostar.prostudy.entity.AdminEntity;
import com.protostar.prostudy.entity.AttendanceEntity;
import com.protostar.prostudy.entity.BookEntity;
import com.protostar.prostudy.entity.Car;
import com.protostar.prostudy.entity.CarAddress;
import com.protostar.prostudy.entity.CarOwner;
import com.protostar.prostudy.entity.CertificateEntity;
import com.protostar.prostudy.entity.ChapterEntity;
import com.protostar.prostudy.entity.CommentEntity;
import com.protostar.prostudy.entity.DivisionEntity;
import com.protostar.prostudy.entity.InstallmentEntity;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.entity.PaymentEntity;
import com.protostar.prostudy.entity.PracticeExamEntity;
import com.protostar.prostudy.entity.PracticeExamResultEntity;
import com.protostar.prostudy.entity.QuestionEntity;
import com.protostar.prostudy.entity.RoleSecEntity;
import com.protostar.prostudy.entity.ScheduledExamEntity;
import com.protostar.prostudy.entity.ScheduledExamResultEntity;
import com.protostar.prostudy.entity.ScheduledQuestionEntity;
import com.protostar.prostudy.entity.ScheduledStudentExamEntity;
import com.protostar.prostudy.entity.StandardEntity;
import com.protostar.prostudy.entity.StudSubEntity;
import com.protostar.prostudy.entity.StudentEntity;
import com.protostar.prostudy.entity.SubjectEntity;
import com.protostar.prostudy.entity.SyllabusEntity;
import com.protostar.prostudy.entity.TeacherEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.entity.UserAnsEntity;
import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.GFBookStockEntity;
import com.protostar.prostudy.gf.entity.GFBookTransactionEntity;
import com.protostar.prostudy.gf.entity.GFCourierEntity;
import com.protostar.prostudy.gf.entity.GFExamResultEntity;
import com.protostar.prostudy.gf.entity.GFStudentEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolInstituteEntity;
import com.protostar.prostudy.proadmin.entities.PaymentPlanType;
import com.protostar.prostudy.until.data.YearCounterEntity;

public class AppServletContextListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// Notification that the servlet context is about to be shut down.
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		System.out.println("###Inside AppServletContextListener###");

		// register all your entities here
		ObjectifyService.register(Car.class);
		  ObjectifyService.register(CarAddress.class);
		  ObjectifyService.register(CarOwner.class);  
		  ObjectifyService.register(StudentEntity.class);  
		  ObjectifyService.register(InstallmentEntity.class);
		  ObjectifyService.register(PaymentEntity.class);
		  ObjectifyService.register(QuestionEntity.class);
		  ObjectifyService.register(PracticeExamEntity.class);
		  ObjectifyService.register(ScheduledQuestionEntity.class);
		  ObjectifyService.register(ScheduledExamEntity.class);
		  ObjectifyService.register(ScheduledExamResultEntity.class);
		  
		  ObjectifyService.register(BookEntity.class);
		  ObjectifyService.register(CommentEntity.class);
		  ObjectifyService.register(ChapterEntity.class);
		  
		  ObjectifyService.register(UserEntity.class);
		  ObjectifyService.register(UserAnsEntity.class);
		  ObjectifyService.register(InstituteEntity.class);
		  ObjectifyService.register(PracticeExamResultEntity.class);
		  ObjectifyService.register(AdminEntity.class);
		  ObjectifyService.register(TeacherEntity.class);
		  ObjectifyService.register(AttendanceEntity.class);
		  ObjectifyService.register(SyllabusEntity.class);

		  ObjectifyService.register(StandardEntity.class);
		  ObjectifyService.register(DivisionEntity.class);			 
		  ObjectifyService.register(SubjectEntity.class);		  
		  ObjectifyService.register(CertificateEntity.class);
		  ObjectifyService.register(YearCounterEntity.class);		
		  ObjectifyService.register(StudSubEntity.class);
		  ObjectifyService.register(RoleSecEntity.class);
		  
		  ObjectifyService.register(PartnerSchoolEntity.class);
		  ObjectifyService.register(PaymentPlanType.class);
		  ObjectifyService.register(ScheduledStudentExamEntity.class);
		  ObjectifyService.register(GFStudentEntity.class);
		  ObjectifyService.register(GFCourierEntity.class);
		  ObjectifyService.register(GFBookEntity.class);
		  ObjectifyService.register(GFBookStockEntity.class);
		  ObjectifyService.register(GFBookTransactionEntity.class);
		  ObjectifyService.register(GFExamResultEntity.class);
		  ObjectifyService.register(PartnerSchoolInstituteEntity.class);
		  


	}

}
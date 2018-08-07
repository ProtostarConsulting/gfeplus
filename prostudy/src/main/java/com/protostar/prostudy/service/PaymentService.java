package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.PaymentEntity;
import com.protostar.prostudy.entity.PracticeExamEntity;
import com.protostar.prostudy.entity.QuestionEntity;

//@Api(name = "paymentService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class PaymentService {


	@ApiMethod(name = "addStudentPayment")
	public PaymentEntity addStudentPayment(PaymentEntity insti) {
		PaymentEntity now = insti;
		ofy().save().entity(insti).now();
		return now;
	}

	@ApiMethod(name = "getPayments")
	public List<PaymentEntity> getPayments() {
		return ofy().load().type(PaymentEntity.class).list();
	}
	
	@ApiMethod(name = "updatePayment")
	public void updatePayment(PaymentEntity exam) {
		Key<PaymentEntity> now = ofy().save().entity(exam).now();
	}
	
	 @ApiMethod(name = "getPaymentByID")
	 public PaymentEntity getPaymentByID(@Named("id") Long pid) {
	  PaymentEntity payment = ofy().load().type(PaymentEntity.class).id(pid).now();
	  return payment;
	  
	 }

}
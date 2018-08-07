package com.protostar.prostudy.proadmin.entities;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class PaymentPlanType{

	/*private Ref<UserEntity> loggedInUser;*/

	@Id
	@Index
	private Long id;
	@Index
	private String accountName;
	
	private String description;
	private String maxuser;
	private String paymentDesc;
	
	
	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMaxuser() {
		return maxuser;
	}

	public void setMaxuser(String maxuser) {
		this.maxuser = maxuser;
	}

	public String getPaymentDesc() {
		return paymentDesc;
	}

	public void setPaymentDesc(String paymentDesc) {
		this.paymentDesc = paymentDesc;
	}
	
	
	

	
	/*public UserEntity getLoggedInUser() {
		return loggedInUser.get();
	}

	public void setLoggedInUser(UserEntity loggedInUser) {
		this.loggedInUser = Ref.create(loggedInUser);
	}*/
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	

}

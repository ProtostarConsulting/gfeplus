package com.protostar.prostudy.entity;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.proadmin.entities.PaymentPlanType;

@Entity
public class InstituteEntity extends BaseEntity {

	private String name;
	private String desc;
	private Address address;
	private String phone_no;
	private String theme;
	private String registerDate;
	private Integer totalUser = 1;
	private String status = "active";
	@Index
	private String LogBlobKey;
	private String authorizations;

	private AppSettingEntity settings;
	private String yearofExam;

	public String getLogBlobKey() {
		return LogBlobKey;
	}

	public void setLogBlobKey(String logBlobKey) {
		LogBlobKey = logBlobKey;
	}

	/*Ref<PaymentPlanType> accounttype;

	public PaymentPlanType getAccounttype() {
		return accounttype.get();
	}

	public void setAccounttype(PaymentPlanType accounttype) {
		this.accounttype = Ref.create(accounttype);
	}*/

	public String getRegisterDate() {
		return registerDate;
	}

	public void setRegisterDate(String registerDate) {
		this.registerDate = registerDate;
	}

	public Integer getTotalUser() {
		return totalUser;
	}

	public void setTotalUser(Integer totalUser) {
		this.totalUser = totalUser;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}



	public String getPhone_no() {
		return phone_no;
	}

	public void setPhone_no(String phone_no) {
		this.phone_no = phone_no;
	}

	public String getAuthorizations() {
		return authorizations;
	}

	public void setAuthorizations(String authorizations) {
		this.authorizations = authorizations;
	}

	public AppSettingEntity getSettings() {
		return settings;
	}

	public void setSettings(AppSettingEntity settings) {
		this.settings = settings;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getYearofExam() {
		return yearofExam;
	}

	public void setYearofExam(String yearofExam) {
		this.yearofExam = yearofExam;
	}

}

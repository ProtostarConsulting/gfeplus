package com.protostar.prostudy.gf.entity;

import java.util.List;

public class ContactDetail {


	private String headMasterName;
	private String headMasterMobile;
	private String  headMasterPhone;
	private String headMasterEmailId;
	private List<CoordinatorDetail> coordinatorDetail;
	/*private String coordinatorName;
	private String coordinatorPhoneNum;
	private String coordinatorEmailId;*/
	public String getHeadMasterName() {
		return headMasterName;
	}
	public void setHeadMasterName(String headMasterName) {
		this.headMasterName = headMasterName;
	}
	public String getHeadMasterMobile() {
		return headMasterMobile;
	}
	public void setHeadMasterMobile(String headMasterMobile) {
		this.headMasterMobile = headMasterMobile;
	}
	public String getHeadMasterEmailId() {
		return headMasterEmailId;
	}
	public void setHeadMasterEmailId(String headMasterEmailId) {
		this.headMasterEmailId = headMasterEmailId;
	}
/*	public String getCoordinatorName() {
		return coordinatorName;
	}
	public void setCoordinatorName(String coordinatorName) {
		this.coordinatorName = coordinatorName;
	}
	public String getCoordinatorPhoneNum() {
		return coordinatorPhoneNum;
	}
	public void setCoordinatorPhoneNum(String coordinatorPhoneNum) {
		this.coordinatorPhoneNum = coordinatorPhoneNum;
	}
	public String getCoordinatorEmailId() {
		return coordinatorEmailId;
	}
	public void setCoordinatorEmailId(String coordinatorEmailId) {
		this.coordinatorEmailId = coordinatorEmailId;
	}
	*/
	public List<CoordinatorDetail> getCoordinatorDetail() {
		return coordinatorDetail;
	}
	public void setCoordinatorDetail(List<CoordinatorDetail> coordinatorDetail) {
		this.coordinatorDetail = coordinatorDetail;
	}
	public String getHeadMasterPhone() {
		return headMasterPhone;
	}
	public void setHeadMasterPhone(String headMasterPhone) {
		this.headMasterPhone = headMasterPhone;
	}

}

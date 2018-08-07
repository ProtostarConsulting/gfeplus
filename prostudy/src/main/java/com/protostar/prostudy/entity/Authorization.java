package com.protostar.prostudy.entity;

import java.util.ArrayList;
import java.util.List;

public class Authorization {	
	
	
	public static final String ORDER_NUMBER = "orderNumber";
	public static final String UI_STATE_NAME = "uiStateName";
	public static final String AUTH_DISPLAY_NAME = "authDisplayName";
	public static final String AUTH_NAME = "authName";
	
	private String authName; //authName must be unique at each level 
	private String authDisplayName;
	private String uiStateName;
	private Long orderNumber;
	private List<Authorization> authorizations = new ArrayList<Authorization>();
	

	public String getUiStateName() {
		return uiStateName;
	}

	public void setUiStateName(String uiStateName) {
		this.uiStateName = uiStateName;
	}

	public String getAuthName() {
		return authName;
	}

	public void setAuthName(String authName) {
		this.authName = authName;
	}

	public String getAuthDisplayName() {
		return authDisplayName;
	}

	public void setAuthDisplayName(String authDisplayName) {
		this.authDisplayName = authDisplayName;
	}

	public Long getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(Long orderNumber) {
		this.orderNumber = orderNumber;
	}

	public List<Authorization> getAuthorizations() {
		return authorizations;
	}

	public void setAuthorizations(List<Authorization> authorizations) {
		this.authorizations = authorizations;
	}

	

}

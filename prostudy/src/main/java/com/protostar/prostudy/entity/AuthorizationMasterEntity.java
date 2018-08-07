package com.protostar.prostudy.entity;

import java.util.ArrayList;
import java.util.List;

public class AuthorizationMasterEntity{

	private List<Authorization> authorizations = new ArrayList<Authorization>();
	
	public List<Authorization> getAuthorizations() {
		return authorizations;
	}

	public void setAuthorizations(List<Authorization> authorizations) {
		this.authorizations = authorizations;
	}
}

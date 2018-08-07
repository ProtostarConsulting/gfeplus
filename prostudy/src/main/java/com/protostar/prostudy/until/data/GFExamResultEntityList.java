package com.protostar.prostudy.until.data;

import java.io.Serializable;
import java.util.List;

import com.protostar.prostudy.gf.entity.GFExamResultEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;

public class GFExamResultEntityList implements Serializable{

	private static final long serialVersionUID = -5926790662677749063L;
	private PartnerSchoolEntity school;
	private List<GFExamResultEntity> list;

	public List<GFExamResultEntity> getList() {
		return list;
	}

	public void setList(List<GFExamResultEntity> list) {
		this.list = list;
	}

	public PartnerSchoolEntity getSchool() {
		return school;
	}

	public void setSchool(PartnerSchoolEntity school) {
		this.school = school;
	}

}

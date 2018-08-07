package com.protostar.prostudy.until.data;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class YearCounterEntity {
	@Id
	private Long id;
	@Index
	private Long year;
	private Long currentCounter;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getYear() {
		return year;
	}

	public void setYear(Long year) {
		this.year = year;
	}

	public Long getCurrentCounter() {
		return currentCounter;
	}

	public void setCurrentCounter(Long currentCounter) {
		this.currentCounter = currentCounter;
	}

	
}
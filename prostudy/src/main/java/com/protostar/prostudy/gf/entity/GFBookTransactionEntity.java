package com.protostar.prostudy.gf.entity;

import java.util.Date;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.entity.BaseEntity;

@Entity
public class GFBookTransactionEntity extends BaseEntity {

	private String transactionType;
	private Date transactionDate;
	@Index
	private long instituteID;
	private int bookQty;
	Ref<GFBookEntity> book;

	public GFBookEntity getBook() {
		return (book == null) ? null : book.get();
	}

	public void setBook(GFBookEntity book) {
		this.book = Ref.create(book);
	}

	private float totalFees;

	public float getTotalFees() {
		return totalFees;
	}

	public void setTotalFees(float totalFees) {
		this.totalFees = totalFees;
	}

	public int getBookQty() {
		return bookQty;
	}

	public void setBookQty(int bookQty) {
		this.bookQty = bookQty;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public Date getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}

	public long getInstituteID() {
		return instituteID;
	}

	public void setInstituteID(long instituteID) {
		this.instituteID = instituteID;
	}

}

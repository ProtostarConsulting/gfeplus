package com.protostar.prostudy.gf.entity;

import java.util.Date;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
@Cache
public class GFBookStockEntity {

	@Id
	private Long id;
	@Index
//	private GFBookEntity book;
	private int bookQty;
	@Index
//	private String bookMedium;
	private Date feedStockDate;
	@Index
	private long instituteID;

//	Ref<PartnerSchoolEntity> schoolName;
	@Index
	Ref<GFBookEntity> book;	
	public GFBookEntity getBook() {
		return book.get();
	}
	public void setBook(GFBookEntity book) {
		this.book =Ref.create(book);
	}

	public long getInstituteID() {
		return instituteID;
	}
	public int getBookQty() {
		return bookQty;
	}
	public void setBookQty(int bookQty) {
		this.bookQty = bookQty;
	}
	public void setInstituteID(long instituteID) {
		this.instituteID = instituteID;
	}
/*	public PartnerSchoolEntity getSchoolName() {
		return schoolName.get();
	}
	public void setSchoolName(PartnerSchoolEntity schoolName) {
		this.schoolName = Ref.create(schoolName);
	}
*/	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
/*	public GFBookEntity getBook() {
		return book;
	}
	public void setBook(GFBookEntity book) {
		this.book = book;
	}
*/	
/*	public String getBookMedium() {
		return bookMedium;
	}
	public void setBookMedium(String bookMedium) {
		this.bookMedium = bookMedium;
	}
*/	public Date getFeedStockDate() {
		return feedStockDate;
	}
	public void setFeedStockDate(Date feedStockDate) {
		this.feedStockDate = feedStockDate;
	}
	
	
}

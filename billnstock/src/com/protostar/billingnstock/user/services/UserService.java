package com.protostar.billingnstock.user.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.user.entities.BusinessEntity;
import com.protostar.billingnstock.user.entities.UserEntity;
import com.protostar.billingnstock.user.entities.tempBusinessEntity;

//import com.protostar.prostudy.entity.BookEntity;

@Api(name = "userService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.user.services", ownerName = "com.protostar.billingnstock.user.services", packagePath = ""))
public class UserService {

	@ApiMethod(name = "addUser")
	public void addUser(UserEntity usr) {
		Key<UserEntity> now = ofy().save().entity(usr).now();
		int count = 1;
		List<UserEntity> list = ofy().load().type(UserEntity.class).list();
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getBusinessAccount().getId()
					.equals(usr.getBusinessAccount().getId())) {
				count++;
			}
		}
		
		BusinessEntity businessEntity = new BusinessEntity();
		businessEntity = usr.getBusinessAccount();
		businessEntity.setTotalUser(count);
		ofy().save().entity(businessEntity).now();

	}
	
	@ApiMethod(name = "updateBusiStatus", path="Somepath_realted_to_your_service")
	public void updateBusiStatus(BusinessEntity businessEntity) {
		ofy().save().entity(businessEntity).now();
	}
	@ApiMethod(name = "getbusinessById")
	public BusinessEntity getbusinessById(@Named("id") Long id) {
		return ofy().load().type(BusinessEntity.class).id(id).now();

	}

	@ApiMethod(name = "updateUser")
	public void updateUser(UserEntity usr) {
		Key<UserEntity> now = ofy().save().entity(usr).now();
	}
	
	@ApiMethod(name = "getUserList")
	public List<UserEntity> getUserList() {
		return ofy().load().type(UserEntity.class).list();
	}

	@ApiMethod(name = "getUserByEmailID")
	public UserEntity getUserByEmailID(@Named("email_id") String email) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("email_id", email).list();
		return (list == null || list.size() == 0) ? null : list.get(0);
	}
	
	@ApiMethod(name = "getBusinessByEmailID", path="Somepath_realted_to_your_service")
	public BusinessEntity getBusinessByEmailID(@Named("adminEmailId") String emailid) {
		List<BusinessEntity> list = ofy().load().type(BusinessEntity.class)
				.filter("adminEmailId", emailid).list();
		return (list == null || list.size() == 0) ? null : list.get(0);
	}

	@ApiMethod(name = "login")
	public UserEntity login(@Named("email_id") String email,
			@Named("password") String pass) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("email_id", email).list();

		UserEntity foundUser = (list == null || list.size() == 0) ? null : list
				.get(0);
		if (foundUser != null) {
			if (foundUser.getPassword().equals(pass)) {
				return foundUser;
			} else {
				return null;

			}
		} else {
			return null;

		}

	}

	@ApiMethod(name = "addBusiness")
	public BusinessEntity addBusiness(BusinessEntity business){
		Date date = new Date();
		String DATE_FORMAT = "dd/MM/yyyy";
		
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		business.setRegisterDate(sdf.format(date));
		
		Key<BusinessEntity> now = ofy().save().entity(business).now();
		
		return business;

		
/*		user.setBusinessAccount(business);
		user.setIsGoogleUser(true);
		user.setAuthority(Arrays.asList("admin"));
		ofy().save().entity(user).now();
*/
	}

	@ApiMethod(name = "addNewBusiness")
	public void addNewBusiness(tempBusinessEntity business) {

		Date date = new Date();
		String DATE_FORMAT = "dd/MM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

		BusinessEntity businessEntity = new BusinessEntity();
		/*businessEntity.setAdminFirstName(business.getAdminFirstName());
		businessEntity.setAdminEmailId(business.getAdminEmailId());
		businessEntity.setAdminLastName(business.getAdminLastName());*/
		businessEntity.setBusinessName(business.getBusinessName());
		businessEntity.setAccounttype(business.getAccounttype());
		businessEntity.setRegisterDate(sdf.format(date));

		ofy().save().entity(businessEntity).now();

		UserEntity userEntity = new UserEntity();
		userEntity.setBusinessAccount(businessEntity);
		/*userEntity.setEmail_id(business.getAdminEmailId());
		userEntity.setFirstName(business.getAdminFirstName());
		userEntity.setLastName(business.getAdminLastName());*/
		userEntity.setIsGoogleUser(business.getIsGoogleUser());
		userEntity.setAuthority(Arrays.asList("admin"));
		userEntity.setPassword(business.getPassword());

		ofy().save().entity(userEntity).now();

	}

	
	@ApiMethod(name = "getUsersByBusinessId")
	public List<UserEntity> getUsersByBusinessId(@Named("id") Long id) {
		List<UserEntity> list =  ofy().load().type(UserEntity.class).list();
		
		List<UserEntity> filtereduser = new ArrayList<UserEntity>();
		
		for(int i=0;i<list.size();i++){
			if(list.get(i).getBusinessAccount().getId().equals(id)){
				filtereduser.add(list.get(i));
			}
		}
		
		return filtereduser;
		
	}

	
	
	
	@ApiMethod(name = "getBusinessList")
	public List<BusinessEntity> getBusinessList() {
		return ofy().load().type(BusinessEntity.class).list();
	}

}
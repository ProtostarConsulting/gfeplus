package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.mail.MessagingException;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.entity.RoleSecEntity;
import com.protostar.prostudy.entity.StudSubEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.gf.entity.GFStudentEntity;
import com.protostar.prostudy.gf.service.EmailHandler;
import com.protostar.prostudy.proadmin.entities.PaymentPlanType;
import com.protostar.prostudy.until.data.Constants;
import com.protostar.prostudy.until.data.ServerMsg;
import com.protostar.prostudy.until.data.UtilityService;

@Api(name = "userService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class UserService {

	private final Logger logger = Logger.getLogger(UserService.class
			.getName());
	@ApiMethod(name = "addUser")
	public UserEntity addUser(UserEntity user) throws MessagingException,
			IOException {
		String nextPRN = UtilityService.getNextPRN(user.getRole());
		user.setPRN(nextPRN);

					
		UserEntity now = user;
		ofy().save().entity(user).now();
		
		GFStudentEntity stud = new GFStudentEntity();
		if(user.getRole().equalsIgnoreCase("Student")){
			stud.setUser(user);
			stud.setfName(user.getFirstName());
			stud.setlName(user.getLastName());
			stud.setInstituteID(user.getInstituteID());
			stud.setRole(user.getRole());
			stud.setPrn(nextPRN);
			stud.setSchool(user.getSchool());
			stud.setStandard(user.getStandard());
			ofy().save().entity(stud).now();
			}
		
		logger.info("now_user :" + now);
		if(user.getIsGoogleUser()){
			InstituteEntity defaultInstituteEntity = this.getDefaultInstituteByName(Constants.DEFAULT_INSTITUTE_NAME);
			new EmailHandler().sendNewInstituteUserRegistrationEmail(user, defaultInstituteEntity.getSendGridApiKey());
		}
		
		return now;
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

		/*
		 * if (list.get(0).getStatus() == "suspended" || list.get(0).getStatus()
		 * == "inactive") { return null; } else { return (list == null ||
		 * list.size() == 0) ? null : list.get(0); }
		 */}
	
	@ApiMethod(name = "getDefaultInstituteByName", path = "getDefaultInstituteByName")
	public InstituteEntity getDefaultInstituteByName(@Named("insName") String insName) {
		List<InstituteEntity> list = ofy().load().type(InstituteEntity.class).filter("name", insName).list();
		return list.get(0);
	}

	@ApiMethod(name = "checkUserAlreadyExist")
	public ServerMsg checkUserAlreadyExist(@Named("email_id") String email_id) {
		ServerMsg serverMsg = new ServerMsg();
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("email_id", email_id).list();

		if (list == null || list.size() == 0) {
			serverMsg.setBool(false);
		} else {
			serverMsg.setBool(true);
		}

		return serverMsg;
	}

	@ApiMethod(name = "getUserByRole", path = "getUserByRole")
	public List<UserEntity> getUserByRole(@Named("role") String role,
			@Named("instituteID") Long instituteID) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("role", role).filter("instituteID", instituteID).list();
		return list;
	}

	@ApiMethod(name = "getUserByInstitute")
	public List<UserEntity> getUserByInstitute(
			@Named("instituteID") Long instituteID) {

		List<UserEntity> userList = ofy().load().type(UserEntity.class)
				.filter("instituteID", instituteID).list();
		return userList;
	}

	@ApiMethod(name = "login")
	public UserEntity login(@Named("email_id") String email,
			@Named("password") String pass) {
		logger.info("Login Attempt by User :" + email);
		email = email.trim();
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("email_id", email).list();
		
		UserEntity foundUser = (list == null || list.size() == 0) ? null : list
				.get(0);
		if (foundUser != null) {
			logger.info("User found: foundUser:" + foundUser);
			if (foundUser.getPassword() != null && foundUser.getPassword().equals(pass)) {
				return foundUser;
			} else {
				logger.info("Password did not match!");
				return null;
			}
		} else {
			logger.info("User is not found!");
			return null;
		}
	}

	@ApiMethod(name = "getUserByClass", path = "getUserByClass")
	public List<UserEntity> getUserByClass(@Named("standard") String standard,
			@Named("division") String division, @Named("subject") String subject) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("standard", standard).filter("division", division)
				.filter("subject", subject).list();

		return list;
	}

	@ApiMethod(name = "getStudentsByScheduledExamID", path = "getStudentsByScheduledExamID")
	public List<UserEntity> getStudentsByScheduledExamID(
			@Named("selectedExam") Long exam) {
		List<UserEntity> list = ofy().load().type(UserEntity.class)
				.filter("selectedExam", exam).list();
		return list;
	}

	@ApiMethod(name = "addOrUpdateRoleSec", path = "addOrUpdateRoleSec")
	public void addOrUpdateRoleSec(RoleSecEntity roleSec) {
		Key<RoleSecEntity> now = ofy().save().entity(roleSec).now();
		logger.info("roleSec :" + now);
	}

	@ApiMethod(name = "getRoleSecListByInstitute", path = "getRoleSecListByInstitute")
	public List<RoleSecEntity> getRoleSecListByInstitute(
			@Named("instituteID") Long instituteID) {
		List<RoleSecEntity> moduleList = ofy().load().type(RoleSecEntity.class)
				.filter("instituteID", instituteID).list();
		return moduleList;
	}

	@ApiMethod(name = "getCurrentUserRoleByInstitute", path = "getCurrentUserRoleByInstitute")
	public List<RoleSecEntity> getCurrentUserRoleByInstitute(
			@Named("instituteID") Long instituteID, @Named("role") String role) {
		List<RoleSecEntity> moduleList = ofy().load().type(RoleSecEntity.class)
				.filter("role", role).filter("instituteID", instituteID).list();

		return moduleList;
	}

	@ApiMethod(name = "getAuthorityByRole")
	public List<RoleSecEntity> getAuthorityByRole(@Named("role") String role,
			@Named("instituteID") Long instituteID) {

		List<RoleSecEntity> moduleList = ofy().load().type(RoleSecEntity.class)
				.filter("role", role).filter("instituteID", instituteID).list();
		return moduleList;

	}

	@ApiMethod(name = "getStudentsBySubjectID", path = "getStudentsBySubjectID")
	public List<UserEntity> getStudentsBySubjectID(@Named("subID") Long subID) {
		logger.info("subID :" + subID);
		StudSubService studSubService = new StudSubService();

		List<StudSubEntity> studSubEntityList = studSubService
				.getstudBySubId(subID);

		logger.info("studSubEntityList :" + studSubEntityList);
		List<Long> studIds = new ArrayList<Long>();
		for (StudSubEntity ss : studSubEntityList) {
			studIds.add(ss.getStudID().getId());
		}
		Map<Long, UserEntity> ids = ofy().load().type(UserEntity.class)
				.ids(studIds.toArray(new Long[studIds.size()]));

		Collection<UserEntity> values = ids.values();
		List<UserEntity> outPutList;
		if (values instanceof List)
			outPutList = (List) values;
		else
			outPutList = new ArrayList(values);

		return outPutList;

	}

	@ApiMethod(name = "updateUserStatus", path = "updateUserStatus")
	public void updateUserStatus(UserEntity userEntity) {

		ofy().save().entity(userEntity).now();

	}

	@ApiMethod(name = "getAllAccountTypes")
	public List<PaymentPlanType> getAllAccountTypes() {
		return ofy().load().type(PaymentPlanType.class).list();
	}

	@ApiMethod(name = "getLogUploadURL")
	public ServerMsg getLogUploadURL() {
		BlobstoreService blobstoreService = BlobstoreServiceFactory
				.getBlobstoreService();
		String createUploadUrl = blobstoreService
				.createUploadUrl("/UploadServlet");
		ServerMsg serverMsg = new ServerMsg();
		serverMsg.setMsg(createUploadUrl);
		return serverMsg;
	}

}
package com.protostar.prostudy.proadmin.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.entity.Address;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.proadmin.entities.PaymentPlanType;

@Api(name = "protostarAdminService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.proadmin.services", ownerName = "com.protostar.prostudy.proadmin.services", packagePath = ""))
public class ProtostarAdminService {

	private static final Logger log = Logger
			.getLogger(ProtostarAdminService.class.getName());

	@ApiMethod(name = "addAccountType")
	public void addAccountType(PaymentPlanType account) {
		ofy().save().entity(account).now();

	}

	@ApiMethod(name = "getallAccountType")
	public List<PaymentPlanType> getallAccountType() {
		log.info("Inside getallAccountType.");
		try {
			return ofy().load().type(PaymentPlanType.class).list();
		} catch (Exception e) {
			log.info("Error Ocuured: " + e.getStackTrace());
		}
		return null;
	}

	@ApiMethod(name = "getAccountTypeById")
	public PaymentPlanType getAccountTypeById(@Named("id") Long id) {
		PaymentPlanType type = ofy().load().type(PaymentPlanType.class).id(id)
				.now();
		return type;
	}

	@ApiMethod(name = "createUsers")
	public void createUsers() {
		try {
			Date date = new Date();
			String DATE_FORMAT = "dd/MM/yyyy";
			SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

			List<PaymentPlanType> accountt = ofy().load()
					.type(PaymentPlanType.class).list();
			PaymentPlanType filteredaccount = new PaymentPlanType();
			for (int i = 0; i < accountt.size(); i++) {
				if (accountt.get(i).getAccountName().equals("Platinum")) {
					filteredaccount = accountt.get(i);
				}
			}

			InstituteEntity instituteEntity = new InstituteEntity();

			instituteEntity.setName("Protostar");
			//instituteEntity.setAccounttype(filteredaccount);
			instituteEntity.setRegisterDate(sdf.format(date));
			String authorizations = "	{\"authorizations\":[{\"authName\":\"proadmin\",\"authorizations\":[]},{\"authName\":\"setup\",\"authorizations\":[]}]}";
			instituteEntity.setAuthorizations(authorizations);
			Address address = new Address();
			address.setLine1("E101, MG Apts, Kasarwadi, Pune");
			address.setCity("Pune");
			address.setState("MH");
			instituteEntity.setAddress(address);

			ofy().save().entity(instituteEntity).now();

			UserEntity userEntity1 = new UserEntity();
			userEntity1.setInstituteID(instituteEntity.getId());
			userEntity1.setEmail_id("ganesh.lawande@protostar.co.in");
			userEntity1.setFirstName("Ganesh");
			userEntity1.setLastName("Lawande");
			userEntity1.setIsGoogleUser(true);
			userEntity1.setAuthority(Arrays.asList("admin"));
			userEntity1.setRole("Admin");
			userEntity1.setAuthorizations(authorizations);
			ofy().save().entity(userEntity1).now();

			// ------------------------------

			UserEntity userEntity2 = new UserEntity();
			userEntity2.setInstituteID(instituteEntity.getId());
			userEntity2.setEmail_id("shantanu@protostar.co.in");
			userEntity2.setFirstName("Shantanu");
			userEntity2.setLastName("Lawande");
			userEntity2.setIsGoogleUser(true);
			userEntity2.setAuthority(Arrays.asList("admin"));
			userEntity2.setRole("Admin");
			userEntity2.setAuthorizations(authorizations);
			ofy().save().entity(userEntity2).now();

			// ------------------------------

			UserEntity userEntity3 = new UserEntity();
			userEntity3.setInstituteID(instituteEntity.getId());
			userEntity3.setEmail_id("sagar@protostar.co.in");
			userEntity3.setFirstName("Sagar");
			userEntity3.setLastName("Sadawarte");
			userEntity3.setIsGoogleUser(true);
			userEntity3.setAuthority(Arrays.asList("admin"));
			userEntity3.setRole("Admin");
			userEntity3.setAuthorizations(authorizations);
			ofy().save().entity(userEntity3).now();
			// ------------------------------

			UserEntity userEntity4 = new UserEntity();
			userEntity4.setInstituteID(instituteEntity.getId());
			userEntity4.setEmail_id("deepali@protostar.co.in");
			userEntity4.setFirstName("Deepali");
			userEntity4.setLastName("M");
			userEntity4.setIsGoogleUser(true);
			userEntity4.setAuthority(Arrays.asList("admin"));
			userEntity4.setRole("Admin");
			userEntity4.setAuthorizations(authorizations);
			ofy().save().entity(userEntity4).now();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@ApiMethod(name = "createAccountPlanTypes")
	public void createAccountPlanTypes() {
		try {
			PaymentPlanType accounttype = new PaymentPlanType();
			accounttype.setAccountName("Free");
			accounttype.setDescription("Free for upto 250 users");
			accounttype.setMaxuser("250");
			accounttype.setPaymentDesc("Free no charges");
			ofy().save().entity(accounttype).now();
			PaymentPlanType accounttype1 = new PaymentPlanType();
			accounttype1.setAccountName("Silver");
			accounttype1.setDescription("Good for upto 500 users");
			accounttype1.setMaxuser("500");
			accounttype1.setPaymentDesc("Rs. 4000 PM + Tax");
			ofy().save().entity(accounttype1).now();
			PaymentPlanType accounttype2 = new PaymentPlanType();
			accounttype2.setAccountName("Gold");
			accounttype2.setDescription("Good for 500 to 750 users");
			accounttype2.setMaxuser("750");
			accounttype2.setPaymentDesc("Rs. 8000 PM + Tax");
			ofy().save().entity(accounttype2).now();
			PaymentPlanType accounttype3 = new PaymentPlanType();
			accounttype3.setAccountName("Platinum");
			accounttype3.setDescription("Good for 750 to 1000 users");
			accounttype3.setMaxuser("1000");
			accounttype3.setPaymentDesc("Rs. 25,000 PM + Tax");
			ofy().save().entity(accounttype3).now();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@ApiMethod(name = "getAllemp")
	public List<UserEntity> getAllemp() {
		return ofy().load().type(UserEntity.class).list();
	}

}// end of InternetService

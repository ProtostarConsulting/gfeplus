package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import com.protostar.prostudy.gf.entity.GFStudentEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;

/**
 * Servlet implementation class DownloadGFStudents
 */
public class DownloadGFStudents extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadGFStudents() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hi i am download servlet");
		if (request.getRemoteHost().contains("localhost")
				|| request.getRemoteHost().contains("127.0.0.1")) {
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods",
					"GET,PUT,POST,DELETE");
			response.addHeader("Access-Control-Allow-Headers", "Content-Type");
		}
		
		Long insId = Long.parseLong(request.getParameter("InstituteId"));

		System.out.println("insid===" + insId);
//		PartnerSchoolService patss=new PartnerSchoolService();
		GFStudentService gfStudentService = new GFStudentService();
		
		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT); 
		
//		List<PartnerSchoolEntity> patse =patss.getPartnerByInstitute(insId);
		
		List<GFStudentEntity> gfStudentEntitie = gfStudentService.getGFStudentsByInstitute(insId);
		
		OutputStream out = null;
		try {

	//		response.setContentType("application/vnd.ms-excel");
			response.setContentType("text/csv");
			
			response.setHeader("Content-Disposition",
					"attachment; filename=GFStudentData_"+sdf.format(date)+".csv");

			ServletOutputStream outputStream = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream);

			writer.append("fName");
			writer.append(',');
			writer.append("mName");
			writer.append(',');
			writer.append("lName");
			writer.append(',');
			writer.append("gender");
			writer.append(',');
			writer.append("mediumOfAnswer");
			writer.append(',');
			writer.append("standard");
			writer.append(',');
/*			writer.append("Temp");
			writer.append(',');*/
			writer.append(System.lineSeparator());
			
			
			for (int i = 0; i < gfStudentEntitie.size(); i++) {
			//	int l=i+1;
			//	int k=15;	

				writer.append(gfStudentEntitie.get(i).getfName());
				writer.append(',');
				writer.append(gfStudentEntitie.get(i).getmName());
				writer.append(',');
				writer.append(gfStudentEntitie.get(i).getlName());
				writer.append(',');
				writer.append(gfStudentEntitie.get(i).getGender());
				writer.append(',');
				writer.append(gfStudentEntitie.get(i).getMediumOfAnswer());
				writer.append(',');
				writer.append(gfStudentEntitie.get(i).getStandard());
				writer.append(',');
/*				writer.append("Temp");
				writer.append(" ");
*/				writer.append(System.lineSeparator());
				
			}	
			writer.close();

		} catch (Exception e) {
			throw new ServletException("Exception in Excel Sample Servlet", e);
		} finally {
			if (out != null)
				out.close();
		}

	}

}
package com.protostar.prostudy.until;

import java.io.InputStream;

import javax.servlet.ServletOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.GrayColor;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfWriter;
import com.protostar.prostudy.gf.entity.GFExamResultEntity;
import com.protostar.prostudy.gf.entity.GFStudentEntity;
import com.protostar.prostudy.until.data.DateUtil;

import freemarker.template.Configuration;
import freemarker.template.TemplateExceptionHandler;

public class PDFHtmlTemplateService {

	public static final Font FONT = new Font(FontFamily.TIMES_ROMAN, 12,
			Font.NORMAL, GrayColor.BLACK);
	static Configuration cfg = null;

	public Configuration getConfiguration() {

		if (cfg != null) {
			return cfg;
		}

		Configuration cfg = new Configuration(Configuration.VERSION_2_3_22);

		cfg.setClassForTemplateLoading(this.getClass(), "/");

		cfg.setDefaultEncoding("UTF-8");
		cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
		cfg.setLogTemplateExceptions(false);
		return cfg;
	}

	public void generateCertificate(GFStudentEntity studEntity,
			GFExamResultEntity examResultEntity,
			ServletOutputStream outputStream) {
		if (studEntity instanceof GFStudentEntity
				|| examResultEntity instanceof GFExamResultEntity) {
			generateStudentCertificate(studEntity, examResultEntity,
					outputStream);
		}

	}

	private void generateStudentCertificate(GFStudentEntity studEntity,
			GFExamResultEntity examResultEntity,
			ServletOutputStream outputStream) {
		try {
			String studName = null, schoolName = null, std = null, file = null;
			String year = DateUtil.getCurrentGVSPYear();
			String[] standardList = { "5th", "6th", "7th", "8th", "9th",
					"10th", "11th", "12th", "FY", "SY", "TY", "Fr. Y",
					"PG/D. & B. Ed-1", "PG/D. & B. Ed-2" };

			if (studEntity != null) {
				studName = studEntity.getfName().toUpperCase() + "  "
						+ studEntity.getmName().toUpperCase() + "  "
						+ studEntity.getlName().toUpperCase();
				schoolName = studEntity.getSchool().getSchoolName()
						.toUpperCase();
				std = studEntity.getStandard().toUpperCase();
			}

			if (examResultEntity != null) {
				studName = examResultEntity.getStudName().toUpperCase();
				schoolName = examResultEntity.getSchool().getSchoolName()
						.toUpperCase();
				std = examResultEntity.getStandard().toUpperCase();
			}

			Document document = new Document(PageSize.A4);
			PdfWriter writer = PdfWriter.getInstance(document, outputStream);
			document.open();
			PdfContentByte cb = writer.getDirectContent();

			if (standardList[0].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_Std5th.pdf";
			} else if (standardList[1].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_Std6th.pdf";
			} else if (standardList[2].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_Std7th.pdf";
			} else if (standardList[3].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_Std8th.pdf";
			} else if (standardList[4].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_Std9th.pdf";
			} else if (standardList[5].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_Std10th.pdf";
			} else if (standardList[6].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_Std11th.pdf";
			} else if (standardList[7].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_Std12th.pdf";
			} else if (standardList[8].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_StdFY.pdf";
			} else if (standardList[9].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_StdSY.pdf";
			} else if (standardList[10].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_StdTY.pdf";
			} else if (standardList[11].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_StdFr_Y.pdf";
			} else if (standardList[12].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_StdPG_FY.pdf";
			} else if (standardList[13].equalsIgnoreCase(std)) {
				file = "certificate_templates/CERTIFICATE_GVSP_StdPG_SY.pdf";
			}

			InputStream inStream = getClass().getClassLoader()
					.getResourceAsStream(file);
			PdfReader reader = new PdfReader(inStream);
			PdfImportedPage page = writer.getImportedPage(reader, 1);
			BaseFont bf = BaseFont.createFont(BaseFont.TIMES_ROMAN,
					BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
			// document.newPage();
			cb.addTemplate(page, 0f, 70f);
			// -----Student Name-----
			cb.saveState();
			cb.beginText();
			if (studName.length() > 20) {
				cb.moveText(180f, 503f);
			} else {
				cb.moveText(240f, 503f);
			}
			cb.setFontAndSize(bf, 12);
			cb.showText(studName);
			cb.endText();
			cb.restoreState();
			// -----School Name----
			cb.saveState();
			cb.beginText();
			if (schoolName.length() > 20) {
				cb.moveText(160f, 477f);
			} else {
				cb.moveText(250f, 477f);
			}
			cb.setFontAndSize(bf, 12);
			cb.showText(schoolName);
			cb.endText();
			cb.restoreState();
			// -----Year of Exam-----
			cb.saveState();
			cb.beginText();
			cb.moveText(320f, 440f);
			cb.setFontAndSize(bf, 12);
			cb.showText(year);
			cb.endText();
			cb.restoreState();

			document.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
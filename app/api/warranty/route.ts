import { NextRequest, NextResponse } from 'next/server';
import {
  findWarrantyByCode,
  createWarrantyCertificate,
  getWarrantyCertificates,
} from '@/lib/warrantyDatabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const getAll = searchParams.get('all') === 'true';

    if (getAll) {
      const allCerts = getWarrantyCertificates();
      return NextResponse.json({
        success: true,
        count: allCerts.length,
        certificates: allCerts,
      });
    }

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message: 'يرجى إدخال كود أو رمز الضمان الإلكتروني للتحقق',
        },
        { status: 400 }
      );
    }

    const certificate = findWarrantyByCode(code);

    if (!certificate) {
      return NextResponse.json(
        {
          success: false,
          code: code.trim().toUpperCase(),
          message:
            'رمز الضمان المدخل غير مسجل في قاعدة البيانات أو لم يتم إصداره بعد. يرجى مراجعة الرمز والتأكد من صحته أو التواصل مع الدعم الفني.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      code: certificate.code,
      certificate,
    });
  } catch (error) {
    console.error('Error in Warranty API GET:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'حدث خطأ غير متوقع أثناء الاتصال بقاعدة بيانات الضمان',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.serviceTitle) {
      return NextResponse.json(
        {
          success: false,
          message: 'اسم العميل وعنوان الخدمة مطلوبان لإصدار شهادة الضمان',
        },
        { status: 400 }
      );
    }

    const newCertificate = createWarrantyCertificate({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      serviceTitle: body.serviceTitle,
      serviceCategory: body.serviceCategory,
      propertyAddress: body.propertyAddress,
      city: body.city,
      durationYears: body.durationYears ? Number(body.durationYears) : 3,
      pesticideDetails: body.pesticideDetails,
      notes: body.notes,
      code: body.code,
    });

    return NextResponse.json({
      success: true,
      message: 'تم تسجيل وإصدار شهادة الضمان الإلكترونية بنجاح في قاعدة البيانات',
      certificate: newCertificate,
    });
  } catch (error) {
    console.error('Error in Warranty API POST:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'حدث خطأ أثناء حفظ شهادة الضمان في قاعدة البيانات',
      },
      { status: 500 }
    );
  }
}

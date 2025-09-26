import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';

interface PDFGeneratorProps {
  personalInfo: {
    name: string;
    title: string;
    summary: string;
  };
  contactInfo: {
    phone: string;
    whatsapp: string;
    email: string;
    location: string;
  };
  experiences: Array<{
    period: string;
    title: string;
    company: string;
    description: string;
    tasks: string[];
  }>;
  education: Array<{
    year: string;
    degree: string;
    institution: string;
  }>;
  skills: string[];
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  personalInfo,
  contactInfo,
  experiences,
  education,
  skills
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Créer un élément temporaire pour le PDF
      const pdfElement = document.createElement('div');
      pdfElement.id = 'pdf-content';
      pdfElement.style.position = 'absolute';
      pdfElement.style.left = '-9999px';
      pdfElement.style.width = '210mm';
      pdfElement.style.backgroundColor = 'white';
      pdfElement.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      pdfElement.style.fontSize = '12px';
      pdfElement.style.lineHeight = '1.5';
      pdfElement.style.color = '#1f2937';
      
      // Page 1 - Profil et Expériences
      const page1 = document.createElement('div');
      page1.style.width = '210mm';
      page1.style.height = '297mm';
      page1.style.padding = '0';
      page1.style.margin = '0';
      page1.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)';
      page1.style.pageBreakAfter = 'always';
      page1.style.display = 'flex';
      page1.style.flexDirection = 'column';

      page1.innerHTML = `
        <!-- Header avec gradient -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #16a34a 100%); padding: 40px 30px; color: white; text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 30px;">
            <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid rgba(255,255,255,0.3); box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
              <img src="/images/Gemini_Generated_Image_dj3qtidj3qtidj3q.png" 
                   style="width: 100%; height: 100%; object-fit: cover;" 
                   alt="Photo de profil" />
            </div>
            <div style="text-align: left;">
              <h1 style="font-size: 36px; font-weight: bold; margin: 0 0 8px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${personalInfo.name}</h1>
              <h2 style="font-size: 20px; margin: 0 0 16px 0; color: #bfdbfe; font-weight: 300;">${personalInfo.title}</h2>
              <div style="display: flex; gap: 20px; font-size: 14px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 16px;">📞</span>
                  <span>${contactInfo.phone}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 16px;">✉️</span>
                  <span>${contactInfo.email}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 16px;">📍</span>
                  <span>${contactInfo.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenu principal -->
        <div style="flex: 1; padding: 30px; display: flex; gap: 30px;">
          
          <!-- Colonne gauche -->
          <div style="width: 35%; display: flex; flex-direction: column; gap: 25px;">
            
            <!-- À propos -->
            <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb, #1d4ed8); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 18px;">👤</span>
                </div>
                <h3 style="font-size: 18px; font-weight: bold; margin: 0; color: #1f2937;">À PROPOS</h3>
              </div>
              <p style="margin: 0; font-size: 11px; line-height: 1.6; text-align: justify; color: #4b5563;">${personalInfo.summary}</p>
            </div>

            <!-- Contact -->
            <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #16a34a, #15803d); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 18px;">📞</span>
                </div>
                <h3 style="font-size: 18px; font-weight: bold; margin: 0; color: #1f2937;">CONTACT</h3>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 32px; height: 32px; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #2563eb; font-size: 14px;">📞</span>
                  </div>
                  <div>
                    <p style="margin: 0; font-size: 10px; color: #6b7280; font-weight: 500;">Téléphone</p>
                    <p style="margin: 0; font-size: 11px; color: #1f2937;">${contactInfo.phone}</p>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 32px; height: 32px; background: #dcfce7; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #16a34a; font-size: 14px;">📱</span>
                  </div>
                  <div>
                    <p style="margin: 0; font-size: 10px; color: #6b7280; font-weight: 500;">WhatsApp</p>
                    <p style="margin: 0; font-size: 11px; color: #1f2937;">${contactInfo.whatsapp}</p>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 32px; height: 32px; background: #fed7aa; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #ea580c; font-size: 14px;">✉️</span>
                  </div>
                  <div>
                    <p style="margin: 0; font-size: 10px; color: #6b7280; font-weight: 500;">Email</p>
                    <p style="margin: 0; font-size: 11px; color: #1f2937; word-break: break-all;">${contactInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Compétences -->
            <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #ea580c, #dc2626); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 18px;">⭐</span>
                </div>
                <h3 style="font-size: 18px; font-weight: bold; margin: 0; color: #1f2937;">COMPÉTENCES</h3>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${skills.map(skill => `
                  <span style="background: linear-gradient(135deg, #fef3c7, #fde68a); color: #92400e; padding: 6px 12px; border-radius: 20px; font-size: 10px; font-weight: 500;">${skill}</span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Colonne droite -->
          <div style="width: 65%; display: flex; flex-direction: column;">
            
            <!-- Expériences -->
            <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); flex: 1;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 25px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb, #1d4ed8); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 18px;">💼</span>
                </div>
                <h3 style="font-size: 20px; font-weight: bold; margin: 0; color: #1f2937;">EXPÉRIENCE PROFESSIONNELLE</h3>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 20px;">
                ${experiences.slice(0, 4).map((exp, index) => `
                  <div style="position: relative; padding-left: 25px; border-left: 3px solid #16a34a;">
                    <div style="position: absolute; left: -8px; top: 0; width: 14px; height: 14px; background: #16a34a; border-radius: 50%;"></div>
                    <div style="background: linear-gradient(135deg, #f8fafc, #e0f2fe); border-radius: 12px; padding: 20px;">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <div>
                          <h4 style="font-size: 14px; font-weight: bold; margin: 0 0 4px 0; color: #1f2937;">${exp.title}</h4>
                          <p style="font-size: 12px; margin: 0; color: #2563eb; font-weight: 600;">${exp.company}</p>
                        </div>
                        <span style="background: #fbbf24; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 500; white-space: nowrap;">${exp.period}</span>
                      </div>
                      <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${exp.tasks.slice(0, 3).map(task => `
                          <div style="display: flex; align-items: flex-start; gap: 8px; font-size: 10px; line-height: 1.4;">
                            <span style="color: #16a34a; margin-top: 2px; font-size: 8px;">▶</span>
                            <span style="color: #4b5563;">${task}</span>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      // Page 2 - Formation et Expériences restantes
      const page2 = document.createElement('div');
      page2.style.width = '210mm';
      page2.style.height = '297mm';
      page2.style.padding = '30px';
      page2.style.margin = '0';
      page2.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)';
      page2.style.display = 'flex';
      page2.style.flexDirection = 'column';
      page2.style.gap = '25px';

      page2.innerHTML = `
        <!-- Expériences restantes -->
        <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); flex: 1;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 25px;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb, #1d4ed8); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 18px;">💼</span>
            </div>
            <h3 style="font-size: 20px; font-weight: bold; margin: 0; color: #1f2937;">EXPÉRIENCE PROFESSIONNELLE (suite)</h3>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${experiences.slice(4).map((exp, index) => `
              <div style="position: relative; padding-left: 25px; border-left: 3px solid #16a34a;">
                <div style="position: absolute; left: -8px; top: 0; width: 14px; height: 14px; background: #16a34a; border-radius: 50%;"></div>
                <div style="background: linear-gradient(135deg, #f8fafc, #e0f2fe); border-radius: 12px; padding: 20px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <div>
                      <h4 style="font-size: 14px; font-weight: bold; margin: 0 0 4px 0; color: #1f2937;">${exp.title}</h4>
                      <p style="font-size: 12px; margin: 0; color: #2563eb; font-weight: 600;">${exp.company}</p>
                    </div>
                    <span style="background: #fbbf24; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 500; white-space: nowrap;">${exp.period}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    ${exp.tasks.map(task => `
                      <div style="display: flex; align-items: flex-start; gap: 8px; font-size: 10px; line-height: 1.4;">
                        <span style="color: #16a34a; margin-top: 2px; font-size: 8px;">▶</span>
                        <span style="color: #4b5563;">${task}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Formation et Atouts -->
        <div style="display: flex; gap: 25px;">
          
          <!-- Formation -->
          <div style="flex: 1; background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
              <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #16a34a, #15803d); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 18px;">🎓</span>
              </div>
              <h3 style="font-size: 18px; font-weight: bold; margin: 0; color: #1f2937;">FORMATION</h3>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 15px;">
              ${education.map(edu => `
                <div style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); border-radius: 12px; padding: 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="font-size: 12px; font-weight: bold; margin: 0; color: #1f2937; line-height: 1.3;">${edu.degree}</h4>
                    <span style="background: #16a34a; color: white; padding: 2px 8px; border-radius: 12px; font-size: 9px; font-weight: 500; white-space: nowrap;">${edu.year}</span>
                  </div>
                  <p style="font-size: 10px; margin: 0; color: #059669; font-weight: 500;">${edu.institution}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Atouts -->
          <div style="flex: 1; background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
              <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #7c3aed, #6d28d9); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 18px;">🏆</span>
              </div>
              <h3 style="font-size: 18px; font-weight: bold; margin: 0; color: #1f2937;">ATOUTS</h3>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 12px;">
                <div style="width: 32px; height: 32px; background: #a855f7; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 16px;">⭐</span>
                </div>
                <span style="font-size: 12px; font-weight: 600; color: #1f2937;">Respectueuse</span>
              </div>
              <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 12px;">
                <div style="width: 32px; height: 32px; background: #a855f7; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 16px;">🎯</span>
                </div>
                <span style="font-size: 12px; font-weight: 600; color: #1f2937;">Travailleuse</span>
              </div>
              <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 12px;">
                <div style="width: 32px; height: 32px; background: #a855f7; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 16px;">🏆</span>
                </div>
                <span style="font-size: 12px; font-weight: 600; color: #1f2937;">Leadership</span>
              </div>
              <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 12px;">
                <div style="width: 32px; height: 32px; background: #a855f7; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 16px;">🤝</span>
                </div>
                <span style="font-size: 12px; font-weight: 600; color: #1f2937;">Travail d'équipe</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 16px; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 12px; font-weight: 500;">
            CV généré le ${new Date().toLocaleDateString('fr-FR')} • ${personalInfo.name} • ${personalInfo.title}
          </p>
        </div>
      `;

      pdfElement.appendChild(page1);
      pdfElement.appendChild(page2);
      document.body.appendChild(pdfElement);

      // Attendre que les images se chargent
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Créer le PDF avec deux pages
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Page 1
      const canvas1 = await html2canvas(page1, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        logging: false,
      });

      const imgData1 = canvas1.toDataURL('image/png', 1.0);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData1, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Page 2
      pdf.addPage();
      const canvas2 = await html2canvas(page2, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        logging: false,
      });

      const imgData2 = canvas2.toDataURL('image/png', 1.0);
      pdf.addImage(imgData2, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Télécharger
      const fileName = `CV_${personalInfo.name.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);

      // Nettoyer
      document.body.removeChild(pdfElement);
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1 md:space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <span className="text-xs md:text-sm hidden sm:inline">Génération...</span>
        </>
      ) : (
        <>
          <Download size={16} />
          <span className="text-xs md:text-sm hidden sm:inline">PDF</span>
        </>
      )}
    </button>
  );
};

export default PDFGenerator;
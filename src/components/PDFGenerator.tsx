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
      pdfElement.style.fontSize = '11px';
      pdfElement.style.lineHeight = '1.4';
      pdfElement.style.color = '#1f2937';
      
      // Page 1 - Format similaire au CV de référence
      const page1 = document.createElement('div');
      page1.style.width = '210mm';
      page1.style.height = '297mm';
      page1.style.padding = '0';
      page1.style.margin = '0';
      page1.style.background = 'white';
      page1.style.pageBreakAfter = 'always';
      page1.style.display = 'flex';

      page1.innerHTML = `
        <!-- Colonne gauche - Sidebar -->
        <div style="width: 35%; background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%); padding: 30px 25px; display: flex; flex-direction: column; gap: 25px;">
          
          <!-- Photo de profil -->
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 140px; height: 140px; border-radius: 50%; overflow: hidden; margin: 0 auto; border: 4px solid white; box-shadow: 0 8px 32px rgba(0,0,0,0.15);">
              <img src="/images/Gemini_Generated_Image_dj3qtidj3qtidj3q.png" 
                   style="width: 100%; height: 100%; object-fit: cover;" 
                   alt="Photo de profil" />
            </div>
          </div>

          <!-- Contact -->
          <div style="background: #64748b; color: white; padding: 15px 20px; border-radius: 25px; text-align: center;">
            <h3 style="font-size: 14px; font-weight: bold; margin: 0 0 15px 0; letter-spacing: 1px;">CONTACTEZ MOI</h3>
          </div>
          
          <div style="margin-top: -15px; padding: 0 5px;">
            <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 14px;">📞</span>
              <span style="font-size: 10px; color: #475569;">${contactInfo.phone}</span>
            </div>
            <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 14px;">📱</span>
              <span style="font-size: 10px; color: #475569;">${contactInfo.whatsapp}</span>
            </div>
            <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 14px;">✉️</span>
              <span style="font-size: 9px; color: #475569; word-break: break-all;">${contactInfo.email}</span>
            </div>
            <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 14px;">📍</span>
              <span style="font-size: 10px; color: #475569;">${contactInfo.location}</span>
            </div>
          </div>

          <!-- Formation -->
          <div style="background: #64748b; color: white; padding: 15px 20px; border-radius: 25px; text-align: center; margin-top: 20px;">
            <h3 style="font-size: 14px; font-weight: bold; margin: 0; letter-spacing: 1px;">FORMATION</h3>
          </div>
          
          <div style="margin-top: -15px; padding: 0 5px;">
            ${education.map(edu => `
              <div style="margin-bottom: 20px;">
                <h4 style="font-size: 11px; font-weight: bold; margin: 0 0 5px 0; color: #1e293b; line-height: 1.3;">${edu.degree}</h4>
                <p style="font-size: 9px; margin: 0 0 3px 0; color: #475569; font-style: italic;">${edu.institution}</p>
                <p style="font-size: 9px; margin: 0; color: #64748b; font-weight: 600;">${edu.year}</p>
              </div>
            `).join('')}
          </div>

          <!-- Compétences -->
          <div style="background: #64748b; color: white; padding: 15px 20px; border-radius: 25px; text-align: center; margin-top: 20px;">
            <h3 style="font-size: 14px; font-weight: bold; margin: 0; letter-spacing: 1px;">SKILLS</h3>
          </div>
          
          <div style="margin-top: -15px; padding: 0 5px;">
            ${skills.map(skill => `
              <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                <span style="width: 6px; height: 6px; background: #2563eb; border-radius: 50%; display: inline-block;"></span>
                <span style="font-size: 10px; color: #475569;">${skill}</span>
              </div>
            `).join('')}
          </div>

          <!-- Atouts -->
          <div style="background: #64748b; color: white; padding: 15px 20px; border-radius: 25px; text-align: center; margin-top: 20px;">
            <h3 style="font-size: 14px; font-weight: bold; margin: 0; letter-spacing: 1px;">ATOUTS</h3>
          </div>
          
          <div style="margin-top: -15px; padding: 0 5px;">
            <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span style="width: 6px; height: 6px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
              <span style="font-size: 10px; color: #475569;">Respectueuse</span>
            </div>
            <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span style="width: 6px; height: 6px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
              <span style="font-size: 10px; color: #475569;">Travailleuse</span>
            </div>
            <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span style="width: 6px; height: 6px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
              <span style="font-size: 10px; color: #475569;">Leadership</span>
            </div>
            <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span style="width: 6px; height: 6px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
              <span style="font-size: 10px; color: #475569;">Travail d'équipe</span>
            </div>
          </div>
        </div>

        <!-- Colonne droite - Contenu principal -->
        <div style="width: 65%; padding: 30px 35px; display: flex; flex-direction: column;">
          
          <!-- En-tête avec nom -->
          <div style="margin-bottom: 30px;">
            <h1 style="font-size: 36px; font-weight: 900; margin: 0 0 5px 0; color: #1e293b; letter-spacing: 2px; text-transform: uppercase;">${personalInfo.name.split(' ').slice(-2).join(' ')}</h1>
            <h2 style="font-size: 24px; font-weight: 300; margin: 0 0 20px 0; color: #64748b;">${personalInfo.name.split(' ').slice(0, -2).join(' ')}</h2>
            <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #2563eb, #16a34a); margin-bottom: 20px;"></div>
            <p style="font-size: 11px; line-height: 1.6; color: #475569; text-align: justify; margin: 0;">${personalInfo.summary}</p>
          </div>

          <!-- Expériences Professionnelles -->
          <div style="margin-bottom: 30px;">
            <h3 style="font-size: 16px; font-weight: bold; margin: 0 0 20px 0; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">EXPÉRIENCES PROFESSIONNELLES</h3>
            
            ${experiences.slice(0, 4).map((exp, index) => `
              <div style="margin-bottom: 25px; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <div>
                    <h4 style="font-size: 12px; font-weight: bold; margin: 0 0 3px 0; color: #1e293b; text-transform: uppercase;">${exp.title}</h4>
                    <p style="font-size: 11px; margin: 0; color: #2563eb; font-weight: 600;">${exp.company}</p>
                  </div>
                  <span style="font-size: 10px; color: #64748b; font-weight: 600; white-space: nowrap; margin-left: 20px;">${exp.period}</span>
                </div>
                
                <div style="margin-top: 10px;">
                  ${exp.tasks.slice(0, 4).map(task => `
                    <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                      <span style="color: #16a34a; margin-top: 2px; font-size: 8px;">●</span>
                      <span style="font-size: 10px; color: #475569; line-height: 1.4;">${task}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      // Page 2 si nécessaire (pour les expériences restantes)
      let page2 = null;
      if (experiences.length > 4) {
        page2 = document.createElement('div');
        page2.style.width = '210mm';
        page2.style.height = '297mm';
        page2.style.padding = '30px 35px';
        page2.style.margin = '0';
        page2.style.background = 'white';
        page2.style.display = 'flex';
        page2.style.flexDirection = 'column';

        page2.innerHTML = `
          <!-- En-tête page 2 -->
          <div style="margin-bottom: 30px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
            <h1 style="font-size: 24px; font-weight: 900; margin: 0; color: #1e293b; letter-spacing: 1px;">${personalInfo.name}</h1>
            <p style="font-size: 12px; color: #64748b; margin: 5px 0 0 0;">${personalInfo.title} - Page 2</p>
          </div>

          <!-- Expériences restantes -->
          <div style="margin-bottom: 30px;">
            <h3 style="font-size: 16px; font-weight: bold; margin: 0 0 20px 0; color: #1e293b; text-transform: uppercase; letter-spacing: 1px;">EXPÉRIENCES PROFESSIONNELLES (suite)</h3>
            
            ${experiences.slice(4).map((exp, index) => `
              <div style="margin-bottom: 25px; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <div>
                    <h4 style="font-size: 12px; font-weight: bold; margin: 0 0 3px 0; color: #1e293b; text-transform: uppercase;">${exp.title}</h4>
                    <p style="font-size: 11px; margin: 0; color: #2563eb; font-weight: 600;">${exp.company}</p>
                  </div>
                  <span style="font-size: 10px; color: #64748b; font-weight: 600; white-space: nowrap; margin-left: 20px;">${exp.period}</span>
                </div>
                
                <div style="margin-top: 10px;">
                  ${exp.tasks.map(task => `
                    <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                      <span style="color: #16a34a; margin-top: 2px; font-size: 8px;">●</span>
                      <span style="font-size: 10px; color: #475569; line-height: 1.4;">${task}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Footer -->
          <div style="margin-top: auto; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="margin: 0; font-size: 10px; color: #64748b;">
              CV généré le ${new Date().toLocaleDateString('fr-FR')} • ${personalInfo.name} • ${personalInfo.title}
            </p>
          </div>
        `;
      }

      pdfElement.appendChild(page1);
      if (page2) {
        pdfElement.appendChild(page2);
      }
      document.body.appendChild(pdfElement);

      // Attendre que les images se chargent
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Créer le PDF
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

      // Page 2 si elle existe
      if (page2) {
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
      }

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
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
      
      // Page 1 - Design professionnel optimisé
      const page1 = document.createElement('div');
      page1.style.width = '210mm';
      page1.style.height = '297mm';
      page1.style.padding = '0';
      page1.style.margin = '0';
      page1.style.background = 'white';
      page1.style.pageBreakAfter = 'always';
      page1.style.display = 'flex';

      page1.innerHTML = `
        <!-- Colonne gauche - Sidebar compacte -->
        <div style="width: 32%; background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%); padding: 25px 20px; display: flex; flex-direction: column; gap: 20px;">
          
          <!-- Photo de profil -->
          <div style="text-align: center; margin-bottom: 15px;">
            <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; margin: 0 auto; border: 3px solid white; box-shadow: 0 6px 20px rgba(0,0,0,0.15);">
              <img src="/images/Gemini_Generated_Image_dj3qtidj3qtidj3q.png" 
                   style="width: 100%; height: 100%; object-fit: cover;" 
                   alt="Photo de profil" />
            </div>
          </div>

          <!-- Contact - Version compacte -->
          <div style="background: #475569; color: white; padding: 10px 15px; border-radius: 20px; text-align: center;">
            <h3 style="font-size: 12px; font-weight: bold; margin: 0; letter-spacing: 0.5px;">CONTACTEZ MOI</h3>
          </div>
          
          <div style="margin-top: -10px; padding: 0 3px;">
            <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 12px;">📞</span>
              <span style="font-size: 9px; color: #475569; font-weight: 500;">${contactInfo.phone}</span>
            </div>
            <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 12px;">📱</span>
              <span style="font-size: 9px; color: #475569; font-weight: 500;">${contactInfo.whatsapp}</span>
            </div>
            <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 12px;">✉️</span>
              <span style="font-size: 8px; color: #475569; word-break: break-all; font-weight: 500;">${contactInfo.email}</span>
            </div>
            <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 12px;">📍</span>
              <span style="font-size: 9px; color: #475569; font-weight: 500;">${contactInfo.location}</span>
            </div>
          </div>

          <!-- Formation - Version compacte -->
          <div style="background: #475569; color: white; padding: 10px 15px; border-radius: 20px; text-align: center; margin-top: 15px;">
            <h3 style="font-size: 12px; font-weight: bold; margin: 0; letter-spacing: 0.5px;">FORMATION</h3>
          </div>
          
          <div style="margin-top: -10px; padding: 0 3px;">
            ${education.map(edu => `
              <div style="margin-bottom: 15px;">
                <h4 style="font-size: 10px; font-weight: bold; margin: 0 0 3px 0; color: #1e293b; line-height: 1.2;">${edu.degree}</h4>
                <p style="font-size: 8px; margin: 0 0 2px 0; color: #475569; font-style: italic; line-height: 1.2;">${edu.institution}</p>
                <p style="font-size: 8px; margin: 0; color: #2563eb; font-weight: 600;">${edu.year}</p>
              </div>
            `).join('')}
          </div>

          <!-- Compétences - Version compacte -->
          <div style="background: #475569; color: white; padding: 10px 15px; border-radius: 20px; text-align: center; margin-top: 15px;">
            <h3 style="font-size: 12px; font-weight: bold; margin: 0; letter-spacing: 0.5px;">COMPÉTENCES</h3>
          </div>
          
          <div style="margin-top: -10px; padding: 0 3px;">
            ${skills.map(skill => `
              <div style="margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                <span style="width: 4px; height: 4px; background: #2563eb; border-radius: 50%; display: inline-block;"></span>
                <span style="font-size: 9px; color: #475569; font-weight: 500;">${skill}</span>
              </div>
            `).join('')}
          </div>

          <!-- Atouts - Version compacte -->
          <div style="background: #475569; color: white; padding: 10px 15px; border-radius: 20px; text-align: center; margin-top: 15px;">
            <h3 style="font-size: 12px; font-weight: bold; margin: 0; letter-spacing: 0.5px;">ATOUTS</h3>
          </div>
          
          <div style="margin-top: -10px; padding: 0 3px;">
            <div style="margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span style="width: 4px; height: 4px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
              <span style="font-size: 9px; color: #475569; font-weight: 500;">Respectueuse</span>
            </div>
            <div style="margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span style="width: 4px; height: 4px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
              <span style="font-size: 9px; color: #475569; font-weight: 500;">Travailleuse</span>
            </div>
            <div style="margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span style="width: 4px; height: 4px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
              <span style="font-size: 9px; color: #475569; font-weight: 500;">Leadership</span>
            </div>
            <div style="margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span style="width: 4px; height: 4px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
              <span style="font-size: 9px; color: #475569; font-weight: 500;">Travail d'équipe</span>
            </div>
          </div>
        </div>

        <!-- Colonne droite - Contenu principal optimisé -->
        <div style="width: 68%; padding: 25px 30px; display: flex; flex-direction: column;">
          
          <!-- En-tête avec nom - Plus visible -->
          <div style="margin-bottom: 25px;">
            <h1 style="font-size: 32px; font-weight: 900; margin: 0 0 3px 0; color: #1e293b; letter-spacing: 1.5px; text-transform: uppercase; line-height: 1.1;">${personalInfo.name}</h1>
            <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 15px 0; color: #2563eb; text-transform: uppercase; letter-spacing: 0.5px;">${personalInfo.title}</h2>
            <div style="width: 80px; height: 3px; background: linear-gradient(90deg, #2563eb, #16a34a); margin-bottom: 15px; border-radius: 2px;"></div>
            <p style="font-size: 10px; line-height: 1.5; color: #374151; text-align: justify; margin: 0; font-weight: 400;">${personalInfo.summary}</p>
          </div>

          <!-- Expériences Professionnelles - Mise en forme claire -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 14px; font-weight: bold; margin: 0 0 15px 0; color: #1e293b; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">EXPÉRIENCES PROFESSIONNELLES</h3>
            
            ${experiences.slice(0, 5).map((exp, index) => `
              <div style="margin-bottom: 20px; position: relative; padding-left: 15px; border-left: 2px solid #e5e7eb;">
                <div style="position: absolute; left: -5px; top: 5px; width: 8px; height: 8px; background: #2563eb; border-radius: 50%;"></div>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                  <div style="flex: 1;">
                    <h4 style="font-size: 11px; font-weight: bold; margin: 0 0 2px 0; color: #1e293b; text-transform: uppercase; letter-spacing: 0.3px;">${exp.title}</h4>
                    <p style="font-size: 10px; margin: 0 0 2px 0; color: #2563eb; font-weight: 600;">${exp.company}</p>
                  </div>
                  <span style="font-size: 9px; color: #6b7280; font-weight: 600; white-space: nowrap; margin-left: 15px; background: #f3f4f6; padding: 2px 8px; border-radius: 10px;">${exp.period}</span>
                </div>
                
                <p style="font-size: 9px; margin: 0 0 8px 0; color: #4b5563; line-height: 1.4; font-style: italic;">${exp.description}</p>
                
                <div style="margin-top: 6px;">
                  ${exp.tasks.slice(0, 4).map(task => `
                    <div style="display: flex; align-items: flex-start; gap: 6px; margin-bottom: 3px;">
                      <span style="color: #16a34a; margin-top: 1px; font-size: 6px; font-weight: bold;">●</span>
                      <span style="font-size: 9px; color: #374151; line-height: 1.3; font-weight: 400;">${task}</span>
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
      if (experiences.length > 5) {
        page2 = document.createElement('div');
        page2.style.width = '210mm';
        page2.style.height = '297mm';
        page2.style.padding = '25px 30px';
        page2.style.margin = '0';
        page2.style.background = 'white';
        page2.style.display = 'flex';
        page2.style.flexDirection = 'column';

        page2.innerHTML = `
          <!-- En-tête page 2 - Plus compact -->
          <div style="margin-bottom: 25px; border-bottom: 2px solid #e5e7eb; padding-bottom: 12px;">
            <h1 style="font-size: 20px; font-weight: 900; margin: 0; color: #1e293b; letter-spacing: 1px;">${personalInfo.name}</h1>
            <p style="font-size: 11px; color: #2563eb; margin: 3px 0 0 0; font-weight: 600;">${personalInfo.title} - Page 2</p>
          </div>

          <!-- Expériences restantes -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 14px; font-weight: bold; margin: 0 0 15px 0; color: #1e293b; text-transform: uppercase; letter-spacing: 0.8px;">EXPÉRIENCES PROFESSIONNELLES (suite)</h3>
            
            ${experiences.slice(5).map((exp, index) => `
              <div style="margin-bottom: 20px; position: relative; padding-left: 15px; border-left: 2px solid #e5e7eb;">
                <div style="position: absolute; left: -5px; top: 5px; width: 8px; height: 8px; background: #2563eb; border-radius: 50%;"></div>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                  <div style="flex: 1;">
                    <h4 style="font-size: 11px; font-weight: bold; margin: 0 0 2px 0; color: #1e293b; text-transform: uppercase; letter-spacing: 0.3px;">${exp.title}</h4>
                    <p style="font-size: 10px; margin: 0 0 2px 0; color: #2563eb; font-weight: 600;">${exp.company}</p>
                  </div>
                  <span style="font-size: 9px; color: #6b7280; font-weight: 600; white-space: nowrap; margin-left: 15px; background: #f3f4f6; padding: 2px 8px; border-radius: 10px;">${exp.period}</span>
                </div>
                
                <p style="font-size: 9px; margin: 0 0 8px 0; color: #4b5563; line-height: 1.4; font-style: italic;">${exp.description}</p>
                
                <div style="margin-top: 6px;">
                  ${exp.tasks.map(task => `
                    <div style="display: flex; align-items: flex-start; gap: 6px; margin-bottom: 3px;">
                      <span style="color: #16a34a; margin-top: 1px; font-size: 6px; font-weight: bold;">●</span>
                      <span style="font-size: 9px; color: #374151; line-height: 1.3; font-weight: 400;">${task}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Footer professionnel -->
          <div style="margin-top: auto; padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="margin: 0; font-size: 8px; color: #6b7280; font-weight: 500;">
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

      // Créer le PDF avec qualité optimisée
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Page 1
      const canvas1 = await html2canvas(page1, {
        scale: 2.5,
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
          scale: 2.5,
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

      // Télécharger avec nom optimisé
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
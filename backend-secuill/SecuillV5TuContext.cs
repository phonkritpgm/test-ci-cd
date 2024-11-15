using System;
using System.Collections.Generic;
using backend_secuill.Database.SECUILL;
using Microsoft.EntityFrameworkCore;

namespace backend_secuill;

public partial class SecuillV5TuContext : DbContext
{
    public SecuillV5TuContext()
    {
    }

    public SecuillV5TuContext(DbContextOptions<SecuillV5TuContext> options)
        : base(options)
    {
    }

    public virtual DbSet<MBed> MBeds { get; set; }

    public virtual DbSet<MCaseUseDrug> MCaseUseDrugs { get; set; }

    public virtual DbSet<MCaseUseDrugSet> MCaseUseDrugSets { get; set; }

    public virtual DbSet<MConvertDrugUnit> MConvertDrugUnits { get; set; }

    public virtual DbSet<MDrug> MDrugs { get; set; }

    public virtual DbSet<MDrugDuo> MDrugDuos { get; set; }

    public virtual DbSet<MDrugInterAction> MDrugInterActions { get; set; }

    public virtual DbSet<MDrugLotNumber> MDrugLotNumbers { get; set; }

    public virtual DbSet<MDrugSwitch> MDrugSwitches { get; set; }

    public virtual DbSet<MError> MErrors { get; set; }

    public virtual DbSet<MMachine> MMachines { get; set; }

    public virtual DbSet<MMachineUnit> MMachineUnits { get; set; }

    public virtual DbSet<MModular> MModulars { get; set; }

    public virtual DbSet<MModularFunction> MModularFunctions { get; set; }

    public virtual DbSet<MPatient> MPatients { get; set; }

    public virtual DbSet<MPatientDrugAllergy> MPatientDrugAllergies { get; set; }

    public virtual DbSet<MPermission> MPermissions { get; set; }

    public virtual DbSet<MPosition> MPositions { get; set; }

    public virtual DbSet<MRoom> MRooms { get; set; }

    public virtual DbSet<MShelf> MShelf { get; set; }

    public virtual DbSet<MSlot> MSlots { get; set; }

    public virtual DbSet<MSoundAlert> MSoundAlerts { get; set; }

    public virtual DbSet<MTitle> MTitles { get; set; }

    public virtual DbSet<MUser> MUsers { get; set; }

    public virtual DbSet<MUserLogin> MUserLogins { get; set; }

    public virtual DbSet<MWard> MWards { get; set; }

    public virtual DbSet<MWardSetting> MWardSettings { get; set; }

    public virtual DbSet<TDoubleLogin> TDoubleLogins { get; set; }

    public virtual DbSet<TDrugRefill> TDrugRefills { get; set; }

    public virtual DbSet<TDrugReturn> TDrugReturns { get; set; }

    public virtual DbSet<TFreePick> TFreePicks { get; set; }

    public virtual DbSet<TLogDoorActive> TLogDoorActives { get; set; }

    public virtual DbSet<TLogMachine> TLogMachines { get; set; }

    public virtual DbSet<TLogProtocal> TLogProtocals { get; set; }

    public virtual DbSet<TLogShelfActive> TLogShelfActives { get; set; }

    public virtual DbSet<TLogSlotActive> TLogSlotActives { get; set; }

    public virtual DbSet<TLogUser> TLogUsers { get; set; }

    public virtual DbSet<TMeassageLog> TMeassageLogs { get; set; }

    public virtual DbSet<TMeassageLogUser> TMeassageLogUsers { get; set; }

    public virtual DbSet<TOrderByUser> TOrderByUsers { get; set; }

    public virtual DbSet<TPharmacyPrintStock> TPharmacyPrintStocks { get; set; }

    public virtual DbSet<TPickError> TPickErrors { get; set; }

    public virtual DbSet<TPickFreeOrder> TPickFreeOrders { get; set; }

    public virtual DbSet<TPickPrescription> TPickPrescriptions { get; set; }

    public virtual DbSet<TPrescription> TPrescriptions { get; set; }

    public virtual DbSet<TPrescriptionReturn> TPrescriptionReturns { get; set; }

    public virtual DbSet<TPrescriptionSend> TPrescriptionSends { get; set; }

    public virtual DbSet<TPrint> TPrints { get; set; }

    public virtual DbSet<TProgramTimestamp> TProgramTimestamps { get; set; }

    public virtual DbSet<TQueryTime> TQueryTimes { get; set; }

    public virtual DbSet<TReport> TReports { get; set; }

    public virtual DbSet<TRolePermission> TRolePermissions { get; set; }

    public virtual DbSet<TStockBeforeAfter> TStockBeforeAfters { get; set; }

    public virtual DbSet<TSummaryDrugRefill> TSummaryDrugRefills { get; set; }

    public virtual DbSet<TSummaryFreePick> TSummaryFreePicks { get; set; }

    public virtual DbSet<TSummaryPickFreeOrder> TSummaryPickFreeOrders { get; set; }

    public virtual DbSet<TSummaryPickPrescription> TSummaryPickPrescriptions { get; set; }

    public virtual DbSet<TSummaryStock> TSummaryStocks { get; set; }

    public virtual DbSet<TUserLoginLog> TUserLoginLogs { get; set; }

    public virtual DbSet<TableColumn> TableColumns { get; set; }

    public virtual DbSet<TableList> TableLists { get; set; }

    public virtual DbSet<TableSchemaDatum> TableSchemaData { get; set; }

    public virtual DbSet<TbMasterUser> TbMasterUsers { get; set; }

    public virtual DbSet<UpdateProgram> UpdatePrograms { get; set; }

    public virtual DbSet<UpdateProgramMaster> UpdateProgramMasters { get; set; }

    public virtual DbSet<UpdateProgramRequest> UpdateProgramRequests { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Thai_CI_AS");

        modelBuilder.Entity<MBed>(entity =>
        {
            entity.HasKey(e => new { e.BedCode, e.BedSeq }).HasName("PK__M_Bed__A449D5164361150F");

            entity.Property(e => e.BedStatus)
                .HasDefaultValueSql("((0))")
                .IsFixedLength();
            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<MCaseUseDrug>(entity =>
        {
            entity.HasKey(e => e.CaseCode).HasName("PK__M_CaseUs__ABC56C70DDD8371B");

            entity.Property(e => e.CaseStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<MCaseUseDrugSet>(entity =>
        {
            entity.HasKey(e => new { e.CasesetId, e.CaseCode, e.CasesetDrugcode }).HasName("PK__M_CaseUs__211CAE13D2640888");

            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<MDrug>(entity =>
        {
            entity.HasKey(e => e.DrugCode).HasName("PK__M_Drug__A6AF7E7DFADD2F5C");

            entity.Property(e => e.DrugAntibiotic).IsFixedLength();
            entity.Property(e => e.DrugCalculate).IsFixedLength();
            entity.Property(e => e.DrugDosage).HasDefaultValueSql("((0))");
            entity.Property(e => e.DrugHighalert)
                .HasDefaultValueSql("((0))")
                .IsFixedLength();
            entity.Property(e => e.DrugNarcotic)
                .HasDefaultValueSql("((0))")
                .IsFixedLength();
            entity.Property(e => e.DrugSizeHeight).HasDefaultValueSql("((0))");
            entity.Property(e => e.DrugSizeWidth).HasDefaultValueSql("((0))");
            entity.Property(e => e.DrugStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
            entity.Property(e => e.DrugVolume).HasDefaultValueSql("((0))");
            entity.Property(e => e.DrugWeight).HasDefaultValueSql("((0))");
            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<MDrugDuo>(entity =>
        {
            entity.HasKey(e => new { e.DrugCode, e.DuoDrugCode }).HasName("PK__M_DrugDu__30262E7A3B41EBA8");

            entity.Property(e => e.DuoStatus).IsFixedLength();
        });

        modelBuilder.Entity<MDrugInterAction>(entity =>
        {
            entity.HasKey(e => e.InteractionNo).HasName("PK__M_DrugIn__605EDA8C84F7C296");
        });

        modelBuilder.Entity<MDrugLotNumber>(entity =>
        {
            entity.Property(e => e.LotMaxqty).HasDefaultValueSql("((0))");
            entity.Property(e => e.LotQty).HasDefaultValueSql("((0))");
            entity.Property(e => e.LotStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MDrugSwitch>(entity =>
        {
            entity.HasKey(e => new { e.DrugCode, e.SwDrugCode }).HasName("PK__M_DrugSw__630477B9EB9E9A2E");

            entity.Property(e => e.SwStatus).IsFixedLength();
        });

        modelBuilder.Entity<MError>(entity =>
        {
            entity.HasKey(e => e.ErrorCode).HasName("PK__M_Error__018D51107C209D4F");

            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<MMachine>(entity =>
        {
            entity.Property(e => e.MachineStatus).IsFixedLength();
        });

        modelBuilder.Entity<MMachineUnit>(entity =>
        {
            entity.HasKey(e => e.UnitNo).HasName("PK__M_Machin__D3A03940F911A1F4");

            entity.Property(e => e.UnitDoorstatus).IsFixedLength();
            entity.Property(e => e.UnitId).IsFixedLength();
            entity.Property(e => e.UnitSizeHeight).HasDefaultValueSql("((0))");
            entity.Property(e => e.UnitSizeLength).HasDefaultValueSql("((0))");
            entity.Property(e => e.UnitSizeWidth).HasDefaultValueSql("((0))");
            entity.Property(e => e.UnitStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MModular>(entity =>
        {
            entity.HasKey(e => e.ModularCode).HasName("PK__M_Modula__D0914FF500813C83");

            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.ModularStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MModularFunction>(entity =>
        {
            entity.HasKey(e => e.ModularfuncCode).HasName("PK__M_Modula__EC51F17C4FE77F54");

            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.ModularfuncStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MPatient>(entity =>
        {
            entity.HasKey(e => new { e.PatRunningno, e.PatHn }).HasName("PK__M_Patien__AF06EEAD06F20457");

            entity.Property(e => e.PatBlood).IsFixedLength();
            entity.Property(e => e.PatSex).IsFixedLength();
            entity.Property(e => e.PatStatus).IsFixedLength();
        });

        modelBuilder.Entity<MPatientDrugAllergy>(entity =>
        {
            entity.HasKey(e => e.DrugallergyId).HasName("PK__M_Patien__78691D800C1A3758");

            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<MPermission>(entity =>
        {
            entity.HasKey(e => e.PerId).HasName("PK__M_Permis__32A15E6785982308");

            entity.Property(e => e.PerStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MPosition>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("PK__M_Positi__3ED787660B98110A");

            entity.Property(e => e.PostStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MRoom>(entity =>
        {
            entity.HasKey(e => new { e.RoomCode, e.RoomSeq }).HasName("PK__M_Room__DE61535E9C225588");

            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.RoomStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MShelf>(entity =>
        {
            entity.HasKey(e => e.ShelfNo).HasName("PK__M_Shelf__E33A3C9E80686DC4");

            entity.Property(e => e.ShelfEventstatus).IsFixedLength();
            entity.Property(e => e.ShelfId).IsFixedLength();
            entity.Property(e => e.ShelfRefrigeretor).IsFixedLength();
            entity.Property(e => e.ShelfSafebox).IsFixedLength();
            entity.Property(e => e.ShelfSizeHeight).HasDefaultValueSql("((0))");
            entity.Property(e => e.ShelfSizeLength).HasDefaultValueSql("((0))");
            entity.Property(e => e.ShelfSizeWidth).HasDefaultValueSql("((0))");
            entity.Property(e => e.ShelfStatus).IsFixedLength();
        });

        modelBuilder.Entity<MSlot>(entity =>
        {
            entity.HasKey(e => e.SlotNo).HasName("PK__M_Slot__971A3E6085F5ADEE");

            entity.ToTable("M_Slot", tb => tb.HasTrigger("InsUpSumStock"));

            entity.Property(e => e.SlotGroupid).IsFixedLength();
            entity.Property(e => e.SlotId).IsFixedLength();
            entity.Property(e => e.SlotMax).HasDefaultValueSql("((0))");
            entity.Property(e => e.SlotMin).HasDefaultValueSql("((0))");
            entity.Property(e => e.SlotPriority).HasDefaultValueSql("((0))");
            entity.Property(e => e.SlotQty).HasDefaultValueSql("((0))");
            entity.Property(e => e.SlotSizeHeight).HasDefaultValueSql("((0))");
            entity.Property(e => e.SlotSizeLength).HasDefaultValueSql("((0))");
            entity.Property(e => e.SlotSizeWidth).HasDefaultValueSql("((0))");
            entity.Property(e => e.SlotStatus).IsFixedLength();
        });

        modelBuilder.Entity<MSoundAlert>(entity =>
        {
            entity.HasKey(e => e.SoundCode).HasName("PK__M_SoundA__0ADEE09F3247ABE6");

            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.SoundStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MTitle>(entity =>
        {
            entity.HasKey(e => e.TitleId).HasName("PK__M_Title__1062D97766577ED7");

            entity.Property(e => e.TitleStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__M_User__B9BE370FEB4733CD");

            entity.Property(e => e.UserStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MUserLogin>(entity =>
        {
            entity.HasKey(e => e.UloginId).HasName("PK__M_UserLo__135D9BDC6538ED5C");

            entity.Property(e => e.UloginStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<MWard>(entity =>
        {
            entity.HasKey(e => e.WardCode).HasName("PK__M_Ward__C88D588DF19232A8");

            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.WardFdstatus)
                .HasDefaultValueSql("('0')")
                .IsFixedLength();
            entity.Property(e => e.WardStatus)
                .HasDefaultValueSql("((0))")
                .IsFixedLength();
        });

        modelBuilder.Entity<MWardSetting>(entity =>
        {
            entity.HasKey(e => e.WardCode).HasName("PK__M_WardSe__C88D588DD8EFE631");

            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.WardStatus)
                .HasDefaultValueSql("((1))")
                .IsFixedLength();
        });

        modelBuilder.Entity<TDoubleLogin>(entity =>
        {
            entity.HasKey(e => e.ConfId).HasName("PK__T_Double__57615BDC735EF173");
        });

        modelBuilder.Entity<TDrugRefill>(entity =>
        {
            entity.HasKey(e => new { e.RefillRunningno, e.RefillNo, e.RefillSeq }).HasName("PK__T_DrugRe__FBD7B4D01745E499");

            entity.ToTable("T_DrugRefill", tb => tb.HasTrigger("InsSumDrugRefill"));

            entity.Property(e => e.DbQty).HasDefaultValueSql("((0))");
            entity.Property(e => e.MachineResp).HasDefaultValueSql("((0))");
            entity.Property(e => e.RefillCase).IsFixedLength();
            entity.Property(e => e.RefillQty).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<TDrugReturn>(entity =>
        {
            entity.HasKey(e => new { e.ReturnId, e.ReturnRef, e.DrugCode }).HasName("PK__T_DrugRe__B799BDFC118B1E53");
        });

        modelBuilder.Entity<TFreePick>(entity =>
        {
            entity.HasKey(e => new { e.FreepickRunningno, e.FreepickNo, e.FreepickSeq }).HasName("PK__T_FreePi__B34F148C20FD7A7D");

            entity.ToTable("T_FreePick", tb => tb.HasTrigger("InsSumFreePick"));

            entity.Property(e => e.DbQty).HasDefaultValueSql("((0))");
            entity.Property(e => e.FreepickErrorstatus).IsFixedLength();
            entity.Property(e => e.FreepickQty).HasDefaultValueSql("((0))");
            entity.Property(e => e.MachineResp).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<TLogDoorActive>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.TLogDoorActive).HasConstraintName("FK_T_LogDoorActive_T_LogProtocal");
        });

        modelBuilder.Entity<TLogMachine>(entity =>
        {
            entity.HasKey(e => e.LogmcRunningno).HasName("PK__M_LogMac__932E819D5A316CE0");

            entity.Property(e => e.LogmcCmd).IsFixedLength();
            entity.Property(e => e.LogmcRecievestatus).IsFixedLength();
            entity.Property(e => e.LogmcSendstatus).IsFixedLength();
        });

        modelBuilder.Entity<TLogShelfActive>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.TLogShelfActive).HasConstraintName("FK_LogProtocal_LogShelfActive");
        });

        modelBuilder.Entity<TLogSlotActive>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ID");

            entity.HasOne(d => d.LogProtocal).WithMany(p => p.TLogSlotActives)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_LogProtocal_LogSlotActive");
        });

        modelBuilder.Entity<TLogUser>(entity =>
        {
            entity.HasKey(e => e.LoguserRunningno).HasName("PK__T_LogUse__65D692D3F39E00A7");

            entity.Property(e => e.LoguserLevel).IsFixedLength();
        });

        modelBuilder.Entity<TMeassageLog>(entity =>
        {
            entity.HasKey(e => e.MessId).HasName("PK__T_Meassa__2A847E9F65D79002");

            entity.Property(e => e.MessStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
        });

        modelBuilder.Entity<TMeassageLogUser>(entity =>
        {
            entity.HasKey(e => e.MessuserId).HasName("PK__T_Meassa__194617DED3202AD0");

            entity.Property(e => e.MessuserReadstatus).IsFixedLength();
            entity.Property(e => e.MessuserStatus)
                .HasDefaultValueSql("('W')")
                .IsFixedLength();
        });

        modelBuilder.Entity<TOrderByUser>(entity =>
        {
            entity.HasKey(e => new { e.OrderRunningno, e.OrderNo, e.OrderSeq }).HasName("PK__T_OrderB__9C659A504E5B59DA");

            entity.Property(e => e.OrderDispensedstatus).IsFixedLength();
            entity.Property(e => e.OrderStatus).IsFixedLength();
        });

        modelBuilder.Entity<TPharmacyPrintStock>(entity =>
        {
            entity.Property(e => e.A).IsFixedLength();
        });

        modelBuilder.Entity<TPickError>(entity =>
        {
            entity.HasKey(e => e.PickerrorId).HasName("PK__T_PickEr__F101EBD8CC43DFE6");

            entity.Property(e => e.DbQty).HasDefaultValueSql("((0))");
            entity.Property(e => e.MachineResp).HasDefaultValueSql("((0))");
            entity.Property(e => e.PickerrorQty).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<TPickFreeOrder>(entity =>
        {
            entity.HasKey(e => new { e.PickorderNo, e.PickorderSeq, e.OrderNo }).HasName("PK__T_PickFr__09587811624B584B");

            entity.ToTable("T_PickFreeOrder", tb => tb.HasTrigger("InsSumPickOrder"));

            entity.Property(e => e.DbQty).HasDefaultValueSql("((0))");
            entity.Property(e => e.MachineResp).HasDefaultValueSql("((0))");
            entity.Property(e => e.PickErrorstatus).IsFixedLength();
        });

        modelBuilder.Entity<TPickPrescription>(entity =>
        {
            entity.HasKey(e => new { e.PickRunningno, e.PickNo, e.PickSeq }).HasName("PK__T_PickPr__B97B7F6FC0B6096A");

            entity.ToTable("T_PickPrescription", tb => tb.HasTrigger("InsSumPickPrescription"));

            entity.Property(e => e.DbQty).HasDefaultValueSql("((0))");
            entity.Property(e => e.MachineResp).HasDefaultValueSql("((0))");
            entity.Property(e => e.PickErrorstatus)
                .HasDefaultValueSql("('0')")
                .IsFixedLength();
        });

        modelBuilder.Entity<TPrescription>(entity =>
        {
            entity.Property(e => e.InsertDt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Lastmodified).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.PresDispenseddesc).HasDefaultValueSql("('Waiting for dispensing')");
            entity.Property(e => e.PresDispensedstatus)
                .HasDefaultValueSql("('W')")
                .IsFixedLength();
            entity.Property(e => e.PresRunningno).ValueGeneratedOnAdd();
            entity.Property(e => e.PresStatus)
                .HasDefaultValueSql("('A')")
                .IsFixedLength();
            entity.Property(e => e.PresStatusdesc).HasDefaultValueSql("('Active')");
        });

        modelBuilder.Entity<TPrescriptionReturn>(entity =>
        {
            entity.HasKey(e => new { e.RunningNo, e.PrescriptionNo, e.PrescriptionDesc, e.PrescriptionDate, e.Seq }).HasName("PK__T_Prescr__290E6A0C20F809D0");

            entity.Property(e => e.RunningNo).ValueGeneratedOnAdd();
            entity.Property(e => e.CreateDt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.HialertDrug).HasDefaultValueSql("((0))");
            entity.Property(e => e.LastModified).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.ProcessNo).HasDefaultValueSql("((0))");
            entity.Property(e => e.ReturnStatus).HasDefaultValueSql("((0))");
            entity.Property(e => e.StatPrn).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<TPrescriptionSend>(entity =>
        {
            entity.Property(e => e.PresOrderqty).HasDefaultValueSql("((0))");
            entity.Property(e => e.PrescriptionGroupKey).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TPrint>(entity =>
        {
            entity.HasKey(e => e.PrintNo).HasName("PK__T_Print__53D4E512BE57D5DE");

            entity.Property(e => e.PresPrintstatus).IsFixedLength();
        });

        modelBuilder.Entity<TQueryTime>(entity =>
        {
            entity.HasKey(e => e.QueryTimeKey).HasName("PK_QueryTime");

            entity.Property(e => e.QueryTimeKey).ValueGeneratedNever();
        });

        modelBuilder.Entity<TReport>(entity =>
        {
            entity.Property(e => e.ReportKey).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TRolePermission>(entity =>
        {
            entity.HasKey(e => e.RoleperId).HasName("PK__T_RolePe__F3EB8F6B2875C489");

            entity.Property(e => e.RolperStatus).IsFixedLength();
        });

        modelBuilder.Entity<TStockBeforeAfter>(entity =>
        {
            entity.Property(e => e.StockBeforeAfterKey).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TSummaryDrugRefill>(entity =>
        {
            entity.HasKey(e => new { e.SumId, e.RefillNo }).HasName("PK__T_Summar__D214EE8C86C7D7B2");

            entity.Property(e => e.RefillCase).IsFixedLength();
            entity.Property(e => e.RefillQty).HasDefaultValueSql("((0))");
            entity.Property(e => e.RefillStatus)
                .HasDefaultValueSql("('0')")
                .IsFixedLength();
        });

        modelBuilder.Entity<TSummaryFreePick>(entity =>
        {
            entity.HasKey(e => new { e.FreepickId, e.FreepickNo, e.PatHn }).HasName("PK__T_Summar__C6517017CEDE2B18");

            entity.Property(e => e.FreepickErrorstatus).IsFixedLength();
        });

        modelBuilder.Entity<TSummaryPickFreeOrder>(entity =>
        {
            entity.HasKey(e => e.SumId).HasName("PK__T_Summar__3D62826AC5CB5DCC");

            entity.Property(e => e.PickErrorstatus)
                .HasDefaultValueSql("((0))")
                .IsFixedLength();
            entity.Property(e => e.PickTime).HasDefaultValueSql("(format(getdate(),'HH:mm','en-us'))");
        });

        modelBuilder.Entity<TSummaryPickPrescription>(entity =>
        {
            entity.HasKey(e => e.SumId).HasName("PK__T_Summar__3D62826A48CA1EC4");

            entity.Property(e => e.PickErrorstatus)
                .HasDefaultValueSql("((0))")
                .IsFixedLength();
            entity.Property(e => e.SumDate).HasDefaultValueSql("(format(getdate(),'yyyy-MM-dd','en-us'))");
            entity.Property(e => e.SumTime).HasDefaultValueSql("(format(getdate(),'HH:mm','en-us'))");
        });

        modelBuilder.Entity<TSummaryStock>(entity =>
        {
            entity.HasKey(e => new { e.StockRunid, e.DrugCode }).HasName("PK__T_Summar__F430C562FA386C39");

            entity.Property(e => e.StockMax).HasDefaultValueSql("((0))");
            entity.Property(e => e.StockMin).HasDefaultValueSql("((0))");
            entity.Property(e => e.StockQty).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<TUserLoginLog>(entity =>
        {
            entity.HasKey(e => e.LoginId).HasName("PK__T_UserLo__C2C971DBFD523F3B");
        });

        modelBuilder.Entity<TableColumn>(entity =>
        {
            entity.Property(e => e.CharacterSetCatalog).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.CharacterSetName).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.CharacterSetSchema).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.CollationCatalog).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.CollationName).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.CollationSchema).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.ColumnDefault).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.ColumnName).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.DataType).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.DomainCatalog).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.DomainName).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.DomainSchema).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.IsNullable).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.TableCatalog).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.TableName).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.TableSchema).UseCollation("Thai_100_CI_AS");
        });

        modelBuilder.Entity<TableList>(entity =>
        {
            entity.Property(e => e.TableName).UseCollation("Thai_100_CI_AS");
        });

        modelBuilder.Entity<TableSchemaDatum>(entity =>
        {
            entity.Property(e => e.LockEscalationDesc).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.Name).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.Type)
                .IsFixedLength()
                .UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.TypeDesc).UseCollation("Thai_100_CI_AS");
        });

        modelBuilder.Entity<TbMasterUser>(entity =>
        {
            entity.HasKey(e => e.FUserid).HasName("PK__tb_maste__C0F378E07A55AFFA");

            entity.Property(e => e.FUserid).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FIdcard).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUseranswer).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserapprover).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUsercomment).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserconfirmid).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserdepartment).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserfullname).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserhint).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUsermobile).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserpasscode).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserpathimage).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserplace).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserquestion).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserregister).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserskincolor).UseCollation("Thai_100_CI_AS");
            entity.Property(e => e.FUserstatus)
                .HasDefaultValueSql("((0))")
                .HasComment("0=Default Off\r\n1=Admin\r\n2=User");
        });

        modelBuilder.Entity<UpdateProgramRequest>(entity =>
        {
            entity.Property(e => e.UpdateProgramRequestKey).ValueGeneratedOnAdd();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

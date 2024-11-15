using System;
using System.Collections.Generic;
using backend_secuill.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_secuill;

public partial class ConhisMiddleV4UbchContext : DbContext
{
    public ConhisMiddleV4UbchContext()
    {
    }

    public ConhisMiddleV4UbchContext(DbContextOptions<ConhisMiddleV4UbchContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TbThaneshospMiddle> TbThaneshospMiddles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Thai_CI_AI");

        modelBuilder.Entity<TbThaneshospMiddle>(entity =>
        {
            entity.Property(e => e.FDispensestatus).HasDefaultValueSql("((0))");
            entity.Property(e => e.FDispensestatusSmt).HasDefaultValueSql("((0))");
            entity.Property(e => e.FDosageQty).HasDefaultValueSql("((0))");
            entity.Property(e => e.FDrugbagsplit).HasDefaultValueSql("((0))");
            entity.Property(e => e.FDurationcode).HasDefaultValueSql("((1))");
            entity.Property(e => e.FHighalertdrug).HasDefaultValueSql("((0))");
            entity.Property(e => e.FLanguage).HasDefaultValueSql("((0))");
            entity.Property(e => e.FLastmodified).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.FMedChemoStatus).HasDefaultValueSql("((0))");
            entity.Property(e => e.FMedRecStatus).HasDefaultValueSql("((0))");
            entity.Property(e => e.FOpdAdminstatus).HasDefaultValueSql("((0))");
            entity.Property(e => e.FPrintstatus).HasDefaultValueSql("((0))");
            entity.Property(e => e.FPrnstat).HasDefaultValueSql("((0))");
            entity.Property(e => e.FStatus).HasDefaultValueSql("((0))");
            entity.Property(e => e.FStatusCheck).HasDefaultValueSql("((0))");
            entity.Property(e => e.RowId).HasDefaultValueSql("(newid())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
